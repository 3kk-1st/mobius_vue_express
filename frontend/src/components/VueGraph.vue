<template>
  <div id="container">
    <Mqtt />
    <d3-network :net-nodes="nodes" :net-links="links" :options="options"/>
    <!--<button v-on:click="addNode">Add 1 Node</button>-->

  </div>
  
</template>

<script>
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
    addCnt(name) {
      //relation between cnt names and ae names:
      // cnt: Mobius/srpi4/radar
      // ae: Mobius/srpi4
      let name_str = name.toString()
      let split_cnt = name_str.split('/')
      split_cnt.pop() //remove last element, radar in example
      split_cnt = split_cnt.join('/') //joins string again
      
      let ref = this.aeNodeRef[split_cnt]  //retrieve reference
      let node = ref[0] //get ae node
      
      let nodelink = this.addNode(node.id, name_str) //add node get returned refs

      return nodelink
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

