<template>
    <div id='mqtt-container'>
      <v-container>
        <v-row>
        <!--card for connect options and connecting -->
        
        
          <v-col>
            <v-card color="white" elevation="24">
              <v-card-title class="text-h5">Connection Options</v-card-title>
              <v-card-subtitle>Connection Status: {{ client.connected }}</v-card-subtitle>
              <div class='flex-config-input'>
                  <p>Host</p>
                  <v-text-field v-model="connection.host" placeholder="localhost">
              </div>
              <div class='flex-config-input'>
                  <p>Port</p>
                  <v-text-field v-model.number="connection.port" placeholder="9001">
              </div>
              <div class='flex-config-input'>
                  <p>Mountpoint / Endpoint</p>
                  <v-text-field v-model="connection.endpoint" placeholder="/mqtt">
              </div>
              <div class='flex-config-input'>
                  <v-btn class="mx-2" color="#66BB6A" v-on:click='createConnection'>Connect</v-btn>
                  <v-btn class="mx-2" color='#66BB6A' v-on:click='destroyConnection'>Disconnect</v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
          
        <v-row>
          <!--card for subscribe -->
          <v-col>
            <v-card color = "white" elevation="24">
            <v-card-title class="text-h5">Subscribe Options</v-card-title>
            <v-card-subtitle>Subscription Status: {{ subscribeSuccess }}</v-card-subtitle>
              <div class='flex-config-input'>
                  <p>Topic</p>
                  <v-text-field v-model="subscription.topic" placeholder="topic/mqttx">
              </div>
              <div class='flex-config-input'>
                  <p>Qos</p>
                  <v-text-field v-model.number="subscription.qos" placeholder="0">
              </div>
              <div class ='flex-config-input'>
                  <v-btn class="mx-2" color="#66BB6A" v-on:click='doSubscribe'>Subscribe</v-btn>
                  <v-btn class="mx-2" color="#66BB6A" v-on:click='doUnSubscribe'>Unsubscribe</v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>



          <!-- flexbox for publish -->
        <v-row>
          <v-col>
            <v-card color="white" elevation="24">
              <v-card-title class="text-h5">Publish Options</v-card-title>
                <div class='flex-config-input'>
                    <p>Topic</p>
                    <v-text-field v-model="publish.topic" placeholder="topic/mqttx">
                </div>
                <div class='flex-config-input'>
                    <p>Qos</p>
                    <v-text-field v-model.number="subscription.qos" placeholder="0">
                </div>
                <div class='flex-config-input'>
                    <p>Message</p>
                    <v-textarea v-model="publish.payload">
                </div>
                <div class='flex-config-input'>
                    <v-btn class="mx-2" color="#66BB6A" v-on:click='doPublish'>Publish</v-btn>
                </div>
            </v-card>
          </v-col>
        </v-row>


          <!-- flexbox for received inputs -->
        <v-row>
          <v-col>
            <v-card color="white" elevation="24">
              <v-card-title style="text-h5">Received Messages</v-card-title>
              <v-textarea v-model='receiveNews'>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
import mqtt from 'mqtt'

export default {
  name: 'Mqtt',

  data() {
    return {
      connection: {
        host: '192.168.0.130',
        port: 9001,
        endpoint: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: '',
        username: '',
        password: '',
      },
      subscription: {
        topic: 'topic/mqttx',  // this is the topic for mobius /oneM2M/req/Mobius2/S2m7DGh9dPe/json
        qos: 0,
      },
      publish: {
        topic: 'topic/mqttx',
        qos: 0,
        payload: `
        {"op":5,"rqi":"rs3Zy8lrqs","to":"mqtt://127.0.0.1/S2m7DGh9dPe?ct=json",
        "fr":"/Mobius2",
        "pc":{
            "m2m:sgn":{
                "sur":"Mobius/rpi4/radar/mobiususer02.MOBIUS.BROWSER.WEB_sub",
                "nev":{
                    "rep":{
                        "m2m:cin":{
                            "rn":"4-20210910020904321","ty":4,
                            "pi":"3-20210909042538192575",
                            "ri":"4-20210910020904321095",
                            "ct":"20210910T020904",
                            "lt":"20210910T020904",
                            "st":166,"et":"20230910T020904",
                            "cs":11,
                            "con":
                                {"key":"128"},
                                "cr":"Srpi4"
                            }
                        },
                        "net":3
                    },
                    "rvi":"2a"
                }
            }
        }`
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    }
  },
  methods: {
    // 创建连接
    createConnection() {
      // 连接字符串, 通过协议指定使用的连接方式
      // ws 未加密 WebSocket 连接
      // wss 加密 WebSocket 连接
      // mqtt 未加密 TCP 连接
      // mqtts 加密 TCP 连接
      // wxs 微信小程序连接
      // alis 支付宝小程序连接

      //topic
      //  -->  /oneM2M/req/Mobius2/S2m7DGh9dPe/json
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        console.log(options)
        this.client = mqtt.connect(connectUrl)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
        let json_ver = JSON.parse(message)
        this.$emit('new_mqtt_msg', json_ver)
        console.log('Sent Message')
      })
    },
    // 订阅主题
    doSubscribe() {
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, qos, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    },
    // 取消订阅
    doUnSubscribe() {
      const { topic } = this.subscription
      this.client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
        }
      })
    },
    // 发送消息
    doPublish() {
      const { topic, qos, payload } = this.publish
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log('Publish error', error)
        }
      })
    },
    // 断开连接
    destroyConnection() {
      if (this.client.connected) {
        try {
          this.client.end()
          this.client = {
            connected: false,
          }
          console.log('Successfully disconnected!')
        } catch (error) {
          console.log('Disconnect failed', error.toString())
        }
      }
    },
  },
}
</script>

<style scoped>
#mqtt-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}
.flex-config {
    display: flex
}
.flex-config-input {
    flex: 1;
    padding: 25px 25px 25px 25px;
}
#message-box {
    width: 50%;
    height: 100px;
}
</style>
