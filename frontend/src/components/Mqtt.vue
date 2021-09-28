<!--<template>
  <div class="home-container">
    <el-card shadow="always" style="margin-bottom:30px;">
      <div class="emq-title">
        Configuration
      </div>
      <el-form ref="configForm" hide-required-asterisk size="small" label-position="top" :model="connection">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="host" label="Host">
              <el-input v-model="connection.host"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="port" label="Port">
              <el-input v-model.number="connection.port" type="number" placeholder="8083/8084"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="endpoint" label="Mountpoint">
              <el-input v-model="connection.endpoint" placeholder="/mqtt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="clientId" label="Client ID">
              <el-input v-model="connection.clientId"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="username" label="Username">
              <el-input v-model="connection.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="password" label="Password">
              <el-input v-model="connection.password"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button
              type="success"
              size="small"
              class="conn-btn"
              style="margin-right: 20px;"
              :disabled="client.connected"
              @click="createConnection"
            >
              {{ client.connected ? 'Connected' : 'Connect' }}
            </el-button>

            <el-button v-if="client.connected" type="danger" size="small" class="conn-btn" @click="destroyConnection">
              Disconnect
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-bottom:30px;">
      <div class="emq-title">
        Subscribe
      </div>
      <el-form ref="subscription" hide-required-asterisk size="small" label-position="top" :model="subscription">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic">
              <el-input v-model="subscription.topic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS">
              <el-select v-model="subscription.qos">
                <el-option
                  v-for="(item, index) in qosList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button
              :disabled="!client.connected"
              type="success"
              size="small"
              class="subscribe-btn"
              @click="doSubscribe"
            >
              {{ subscribeSuccess ? 'Subscribed' : 'Subscribe' }}
            </el-button>
            <el-button
              :disabled="!client.connected"
              type="success"
              size="small"
              class="subscribe-btn"
              style="margin-left:20px"
              @click="doUnSubscribe"
              v-if="subscribeSuccess"
            >
              Unsubscribe
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-bottom:30px;">
      <div class="emq-title">
        Publish
      </div>
      <el-form ref="publish" hide-required-asterisk size="small" label-position="top" :model="publish">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic">
              <el-input v-model="publish.topic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="payload" label="Payload">
              <el-input v-model="publish.payload" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS">
              <el-select v-model="publish.qos">
                <el-option
                  v-for="(item, index) in qosList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-col :span="24">
        <el-button :disabled="!client.connected" type="success" size="small" class="publish-btn" @click="doPublish">
          Publish
        </el-button>
      </el-col>
    </el-card>
    <el-card shadow="always" style="margin-bottom:30px;">
      <div class="emq-title">
        Receive
      </div>
      <el-col :span="24">
        <el-input type="textarea" :rows="3" style="margin-bottom: 15px" v-model="receiveNews"></el-input>
      </el-col>
    </el-card>
  </div>
</template>-->

<template>
    <div id='mqtt-container'>

        <!--flexbox for connect options and connecting -->

        <div class='flex-config'>
            <div class='flex-config-input'>
                <p>Host</p>
                <input v-model="connection.host" placeholder="localhost">
            </div>
            <div class='flex-config-input'>
                <p>Port</p>
                <input v-model.number="connection.port" placeholder="9001">
            </div>
            <div class='flex-config-input'>
                <p>Mountpoint / Endpoint</p>
                <input v-model="connection.endpoint" placeholder="/mqtt">
            </div>
            <div class='flex-config-input'>
                <button class='button-submit' v-on:click='createConnection'>Connect</button>
                <button class='button-submit' v-on:click='destroyConnection'>Disconnect</button>
            </div>
            <div class='flex-config-input'>
                <div class='display-status'>
                    <p>Currently client connected status is: {{ client.connected }}</p>
                </div>
            </div>
        </div>

        <!--flexbox for subscribe -->

        <div class='flex-config'>
            <div class='flex-config-input'>
                <p>Host</p>
                <input v-model="subscription.topic" placeholder="topic/mqttx">
            </div>
            <div class='flex-config-input'>
                <p>Port</p>
                <input v-model.number="subscription.qos" placeholder="0">
            </div>
            <div class='flex-config-input'>
                <button class='button-submit' v-on:click='doSubscribe'>Subscribe</button>
                <button class='button-submit' v-on:click='doUnSubscribe'>Unsubscribe</button>
            </div>
            <div class='flex-config-input'>
                <div class='display-status'>
                    <p>Currently client subscribed status is: {{ subscribeSuccess }}</p>
                </div>
            </div>
        </div>

        <!-- flexbox for publish -->

        <div class='flex-config'>
            <div class='flex-config-input'>
                <p>Host</p>
                <input v-model="publish.topic" placeholder="topic/mqttx">
            </div>
            <div class='flex-config-input'>
                <p>Port</p>
                <input v-model.number="subscription.qos" placeholder="0">
            </div>
            <div class='flex-config-input'>
                <p>Host</p>
                <input v-model="publish.payload">
            </div>
            <div class='flex-config-input'>
                <button class='button-submit' v-on:click='doPublish'>Publish</button>
            </div>
        </div>

        <!-- flexbox for received inputs -->
        <div class='flex-config'>
            <div class='flex-config-input'>
                <input id='message-box' v-model='receiveNews'>
            </div>
        </div>

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
        topic: 'topic/mqttx',
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
    flex: 1
}
.button-submit {
    color:mediumseagreen
}
.display-status {
    color:darkslategray
}
#message-box {
    width: 50%;
    height: 100px;
}
</style>s


<!--
<style lang="scss">
@import url('../assets/home.scss');

.home-container {
  max-width: 1100px;
  margin: 0 auto;

  .conn-btn {
    color: #fff;
    background-color: #00b173;
    font-size: 14px;
  }

  .publish-btn {
    margin-bottom: 20px;
    float: right;
  }

  .el-button--success {
    background-color: #34c388 !important;
    border-color: #34c388 !important;
    font-size: 14px !important;
  }

  .el-button--danger {
    background-color: #f5222d !important;
    border-color: #f5222d !important;
  }

  .el-form-item {
    &.is-error {
      .el-input__inner,
      .el-textarea__inner {
        box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
      }
    }
    &.is-success {
      .el-input__inner,
      .el-textarea__inner {
        border-color: #34c388 !important;
      }
    }
  }
}
</style>
-->

