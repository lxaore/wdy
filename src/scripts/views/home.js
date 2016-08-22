var indexHome = require('../tpls/home.string');
var scroll = require('../utils/scroll.js');

SPA.defineView('home', {
  html: indexHome,

  plugins: [
    'delegated', {
      name: 'avalon',
      options: function (vm) {
        vm.livelist = [];
        vm.isShowLoading = true;
      }
    }
  ],

  // 绑定tap
  bindActions: {
    'goto.detail': function (el, data) {
      SPA.open('detail', {
        param: {
          id: data.id
        }
      });
    }
  },

  // 绑定视图事件
  bindEvents: {
    'show': function () {

      // 获得vm
      var vm = this.getVM();

      // ajax拉取数据
      $.ajax({
        url: '/api/livelist.php',
        type: 'get',
        data: {
          type: 'more',
          pageNo: 1
        },
        success: function (res) {
          setTimeout(function () {
            vm.livelist = res.data;
            vm.isShowLoading = false;
          }, 5000);
        }
      });

      // swiper
      var mySwiper = new Swiper('#home-swiper', {
        loop: false,
        onSlideChangeStart: function(swiper){
          var index = swiper.activeIndex;
          $('#home-nav li').eq(index).addClass('active').siblings().removeClass('active');
        }
      });
      $('#home-nav li').on('tap', function () {
        mySwiper.slideTo($(this).index());
      });

      // scroll
      scroll({
        scroll: this.widgets.myScroll,
        vm: vm
      })
    }
  }
});
