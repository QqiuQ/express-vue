<template>
  <div class="dashboard-container" style="display: flex; align-items: center; flex-direction: column">
    <div style="width: 900px">
      <img src="../../assets/images/logo.png" alt="寄了么" height="65" style="float: left">
    </div>
    <div style="background-color: rgb(205, 4, 1); width: 100%; height: 150px; display: flex; justify-content: center">
      <div style="width: 900px; display: flex">
        <div style="flex: 3; display: flex; align-items: center">
          <img src="../../assets/images/ldqz.png" alt="镰刀锤子">
          <div style="display: flex; flex-direction: column; margin-left: 30px; border-right: white solid; padding-right: 50px">
            <span style="font-weight: bold; font-size: 28px; color: white">中国共产党</span>
            <span style="font-weight: bold; font-size: 28px; color: white">吃了吗支部</span>
          </div>
        </div>
        <div style="flex: 2.3; display: flex; align-items: center">
          <span style="font-weight: bold; font-size: 60px; color: white; margin-left: 30px">党建</span>
        </div>
        <div style="flex: 4; display: flex; flex-direction: column; justify-content: center">
          <div style="margin-bottom: 35px">
            <span style="font-size: 16px; color: white; margin-right: 20px">联系方式</span>
            <i class="el-icon-message" style="color: white; font-size: 16px; margin-right: 5px" />
            <span style="font-size: 16px; color: white; margin-right: 20px">host@arridved.com</span>
            <i class="el-icon-phone" style="color: white; font-size: 16px;margin-right: 5px" />
            <span style="font-size: 16px; color: white">010-11111111</span>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 900px; height: 100px; display: flex; padding-top: 5px">
      <div style="flex: 1; display: flex">
        <div style="background-color: orange; flex: 1; display: flex; justify-content: center; align-items: center; width: 75px; flex-direction: column">
          <span style="font-size: 40px; font-family: 'STKaiti'; color: white">发</span>
          <span style="font-size: 40px; font-family: 'STKaiti'; color: white">布</span>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
            <a href="http://dangjian.people.com.cn/GB/394443/index.html" style="font-size: 12px; margin-bottom: 3px">党建要闻</a>
            <a href="http://dangjian.people.com.cn/GB/78694/index.html" style="font-size: 12px; margin-top: 3px">先锋人物</a>
          </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
            <a href="http://dangjian.people.com.cn/GB/394443/index.html" style="font-size: 12px; margin-bottom: 3px">党建论坛</a>
            <a href="http://dangjian.people.com.cn/GB/78694/index.html" style="font-size: 12px; margin-top: 3px">评论观点</a>
          </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
            <a href="http://dangjian.people.com.cn/GB/394443/index.html" style="font-size: 12px; margin-bottom: 3px">邪恶势力</a>
            <a href="http://dangjian.people.com.cn/GB/78694/index.html" style="font-size: 12px; margin-top: 3px">绳之以法</a>
          </div>
        </div>
      </div>
      <div style="flex: 1; display: flex">
        <div style="background-color: orange; flex: 1; display: flex; justify-content: center; align-items: center; width: 75px; flex-direction: column">
          <span style="font-size: 40px; font-family: 'STKaiti'; color: white">学</span>
          <span style="font-size: 40px; font-family: 'STKaiti'; color: white">习</span>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
            <a href="http://dangjian.people.com.cn/GB/394443/index.html" style="font-size: 12px; margin-bottom: 3px">云党课</a>
            <a href="http://dangjian.people.com.cn/GB/78694/index.html" style="font-size: 12px; margin-top: 3px">图解库</a>
          </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
            <a href="http://dangjian.people.com.cn/GB/394443/index.html" style="font-size: 12px; margin-bottom: 3px">学习园地</a>
            <a href="http://dangjian.people.com.cn/GB/78694/index.html" style="font-size: 12px; margin-top: 3px">党务书库</a>
          </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
            <a href="http://dangjian.people.com.cn/GB/394443/index.html" style="font-size: 12px; margin-bottom: 3px">党建数据库</a>
            <a href="http://dangjian.people.com.cn/GB/78694/index.html" style="font-size: 12px; margin-top: 3px">党建要参</a>
          </div>
        </div>
      </div>
      <div style="flex: 1; display: flex;">
        <div style="background-color: orange; flex: 1; display: flex; justify-content: center; align-items: center; width: 75px; flex-direction: column">
          <span style="font-size: 40px; font-family: 'STKaiti'; color: white">基</span>
          <span style="font-size: 40px; font-family: 'STKaiti'; color: white">层</span>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
            <a href="http://dangjian.people.com.cn/GB/394443/index.html" style="font-size: 12px; margin-bottom: 3px">国企</a>
            <a href="http://dangjian.people.com.cn/GB/78694/index.html" style="font-size: 12px; margin-top: 3px">机关</a>
          </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
            <a href="http://dangjian.people.com.cn/GB/394443/index.html" style="font-size: 12px; margin-bottom: 3px">非公</a>
            <a href="http://dangjian.people.com.cn/GB/78694/index.html" style="font-size: 12px; margin-top: 3px">社区</a>
          </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
            <a href="http://dangjian.people.com.cn/GB/394443/index.html" style="font-size: 12px; margin-bottom: 3px">学校</a>
            <a href="http://dangjian.people.com.cn/GB/78694/index.html" style="font-size: 12px; margin-top: 3px">农村</a>
          </div>
        </div>
      </div>
    </div>
    <HR align="center" width="100%" color="#987cb9" s-i-z-e="1" />
    <div style="width: 900px; display: flex">
      <el-carousel :interval="3000" arrow="always" style="width: 450px">
        <el-carousel-item v-for="item in images" :key="item.id" style="display: flex; justify-content: center; align-items: center">
          <img :src="item.idView" class="image" alt="党建">
        </el-carousel-item>
      </el-carousel>
      <div style="width: 450px; display: flex; align-items: center; flex-direction: column;">
        <div style="flex: 2; display: flex; align-items: center; justify-content: center">
          <a href="http://dangjian.people.com.cn/n1/2023/1110/c117092-40115073.html" style="font-size: 30px; font-family: 'STKaiti'">让一切文化创造源泉充分涌流</a>
        </div>
        <div style="flex: 1">
          <a href="http://dangjian.people.com.cn/n1/2023/1109/c117092-40114292.html" style="font-size: 20px; font-family: 'STKaiti">彰显党的历史自信、文化自信达到了新高度</a>
        </div>
        <div style="flex: 1">
          <a href="http://dangjian.people.com.cn/n1/2023/1110/c117092-40115093.html" style="font-size: 20px; font-family: 'STKaiti">革命精神是共产党人的宝贵财富</a>
        </div>
        <div style="flex: 1">
          <a href="http://dangjian.people.com.cn/n1/2023/1109/c117092-40114292.html" style="font-size: 20px; font-family: 'STKaiti">中国共产党党徽党旗图案使用规定</a>
        </div>
      </div>
    </div>
    <div style="height: 20px; border-bottom: lightgray solid" />
    <div style="width: 900px">
      <a href="http://dangjian.people.com.cn/GB/136058/441888/index.html">
        <img src="../../assets/images/banner.png" alt="共产主义旗帜" style="width: 100%">
      </a>
    </div>
    <footer style="display: flex; align-items: center; flex-direction: column">
      <div class="footer">人民日报社概况 | 关于人民网 | 报社招聘 | 招聘英才 | 广告服务 | 合作加盟 | 供稿服务 | 数据服务 | 网站声明 | 网站律师 | 信息保护 | 联系我们</div>
      <div class="footer">人民日报违法和不良信息举报电话：010-65363263    举报邮箱：jubao@people.cn</div>
      <div class="footer">人民网服务邮箱：kf@people.cn    违法和不良信息举报电话：010-65363636    举报邮箱：rmwjubao@people.cn</div>
      <div class="footer">互联网新闻信息服务许可证10120170001  |  增值电信业务经营许可证B1-20060139  |  广播电视节目制作经营许可证（广媒）字第172号</div>
      <div class="footer">信息网络传播视听节目许可证0104065 | 网络文化经营许可证 京网文[2020]5494-1075号 | 网络出版服务许可证（京）字121号 | 京ICP证000006号 | 京公网安备11000002000008号</div>
      <div class="footer">人 民 网 股 份 有 限 公 司 版 权 所 有 ，未 经 书 面 授 权 禁 止 使 用
        Copyright © 1997-2023 by www.people.com.cn. all rights reserved</div>
      <div style="display: flex">
        <a href="http://www.piyao.org.cn/">
          <img src="../../assets/images/piyap.png" alt="image">
        </a>
        <a href="http://www.people.com.cn/img/2014xuke/2018icp.html">
          <img src="../../assets/images/beian.png" alt="image">
        </a>
        <a href="https://ss.knet.cn/verifyseal.dll?sn=e12050911010020686307708&ct=df&a=1&pa=980951">
          <img src="../../assets/images/shenfen.png" alt="image">
        </a>
        <a href="https://si.trustutn.org/info?sn=470170320027574551118&certType=1">
          <img src="../../assets/images/pingpai.png" alt="image">
        </a>
        <a href="http://localhost:9639">
          <img src="../../assets/images/logo.png" alt="image" style="height: 49px">
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      currentRole: 'adminDashboard',
      images: [
        { id: 0, idView: require('@/assets/images/zggcd_zc.png') },
        { id: 1, idView: require('@/assets/images/tiananmen.png') },
        { id: 2, idView: require('@/assets/images/xidada.png') },
        { id: 3, idView: require('@/assets/images/wujing.jpg') },
        { id: 4, idView: require('@/assets/images/wujing2.jpg') }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.footer {
  font-size: 10px;
  padding: 5px 0 5px 0;
}
</style>
