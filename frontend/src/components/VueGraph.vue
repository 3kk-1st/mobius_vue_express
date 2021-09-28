<template>
  <div id="container">
    <Mqtt v-on:new_mqtt_msg="addCin" />
    <d3-network :net-nodes="nodes" :net-links="links" :options="options"/>

  </div>
  
</template>

<script>
import * as utils from '../assets/utils.js'
import D3Network from 'vue-d3-network'
import Mqtt from './Mqtt.vue'


export default {
  components: {
    D3Network,
    Mqtt
  },
  data () {
    return {
      nodes: [
        { id: 0, name: 'Mobius Server' , _cssClass: 'node pinned', pinned: true, fx: window.innerWidth / 2, fy: window.innerHeight / 2},
      ],
      links: [],
      rawAe: [],
      aeNodeRef: {},  //object --> {key: aename val: [node obj, link obj], ...} store reference to nodes and links 
      rawCnt: [],
      cntNodeRef: {}, //object --> {key: cntname val:[node obj, link obj], ...} store reference to nodes and links
      cinNodeRef: {}, //object --> {key: cntname val:[[node obj, link obj], ... ], ...} store reference to nodes and links
      options:
      {
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth:5,
      }
    }
  },
  created () {
    let vm = this

    //connect to get aes
    this.$http.get('/api/mob_ae')
      .then((response) => {
        //on response
        response.data.forEach(function(obj) {
          console.log(obj.ri)

          //add to rawAe array and store references to Ae nodes
          vm.rawAe.push(obj.ri)
          let nodelink = vm.addNode(0, obj.ri)
          vm.aeNodeRef[nodelink[0].name] = nodelink
        })
      })

    //connect to get cnts
    //use ae data to connect cnts
    this.$http.get('/api/mob_cnt')
        .then((response) => {
          //on response
          response.data.forEach(function(obj) {
            console.log(obj.ri)

            //
            vm.rawCnt.push(obj.ri)
            let nodelink = vm.addCnt(obj.ri)
            vm.cntNodeRef[nodelink[0].name] = nodelink
          });
        });
    
    
  },
  methods: {
    addLink(id_to_link, curr_id) {
      let vm = this 

      vm.links.push({sid: id_to_link, tid: curr_id}) //sid = source id / tid = target id 
      return vm.links.at(-1)
    },
    addNode(id_to_link, name) { //id_to_link is id to link to, name is name of node  // change id_to_link to tid?
      let vm = this

      var highest_id = this.nodes.at(-1)["id"]
      highest_id = highest_id + 1
      vm.nodes.push({id: highest_id, name: name})
      let node = vm.nodes.at(-1)
      let link = vm.addLink(id_to_link, highest_id)

      //return reference to most recently added node, link 

      return [node, link]
    },


    //taken from example code https://github.com/emiliorizzo/vue-d3-network/blob/master/src/example/d3-net-example.vue
    rebuildLinks (nodes) {
      console.log(nodes)
      if (!nodes) nodes = this.nodes
      console.log(nodes)
      let links = utils.rebuildLinks(nodes, this.links)
      console.log(links)
      /*for (let link of links.removed) {
        if (this.linksSelected[link.id]) {
          delete (this.linksSelected[link.id])
        }
      }*/
      return links.newLinks
    },
    removeNode(nodelink) {  //currently only for removing cin values, removes links automatically
      let nodeId = nodelink[0].id
      console.log(nodeId)
      console.log(this.nodes)
      console.log(this.links)
      utils.removeNode(nodeId, this.nodes, (nodes) => {
        if (nodes) {
          this.links = this.rebuildLinks(nodes)
          //this.unSelectNode(nodeId)
          this.nodes = utils.rebuildNodes(this.links, nodes)
        }
      })
    },

    //end code taken from example code 

    addCnt(name) {
      //relation between cnt names and ae names:
      // cnt: Mobius/srpi4/radar
      // ae: Mobius/srpi4
      let split_cnt = name.split('/')
      split_cnt.pop() //remove last element, radar in example
      split_cnt = split_cnt.join('/') //joins string again
      
      let ref = this.aeNodeRef[split_cnt]  //retrieve reference
      let node = ref[0] //get ae node
      
      let nodelink = this.addNode(node.id, name) //add node get returned refs

      return nodelink
    },
    addCin(json_ver) {
      console.log('enter add cin')

      let vm = this
      //parsing this is dependent on json string that mqtt passes from mobius
      let cin_url = '/' + json_ver.pc['m2m:sgn'].sur 
      let cin_data = json_ver.pc['m2m:sgn'].nev.rep['m2m:cin'].con.key

      let split_url = cin_url.split('/')  //returns something like [ '', 'Mobius', 'rpi4', 'radar', 'hi' ]
      split_url = split_url.slice(0, 4) //slicing this removes everything past radar in above example 
      split_url = split_url.join('/')

      let ref = this.cntNodeRef[split_url]
      let node = ref[0]

      // if a reference to something in javascript is removed, 
      // it becomes undefined so later can just look over values and if contains undefined, remove 

      let nodelink = this.addNode(node.id, cin_data)
      
      if (!(split_url in vm.cinNodeRef)) {
        vm.cinNodeRef[split_url] = []
        vm.cinNodeRef[split_url].push(nodelink)
      }
      if (split_url in vm.cinNodeRef) {
        if (vm.cinNodeRef[split_url].length > 3) {  //limit of 3 cin values
          let pop_val = vm.cinNodeRef[split_url].pop(0) //remove oldest value
          vm.removeNode(pop_val) //use oldest value to remove from nodes and links
          vm.cinNodeRef[split_url].push(nodelink) //add new val 
        }
        else {
          vm.cinNodeRef[split_url].push(nodelink)
        }
      }

    }
  }
}
</script>


<style src="vue-d3-network/dist/vue-d3-network.css">
#container{
    display: flex;
    width: 100%;
    height: 100%;
}
</style>

