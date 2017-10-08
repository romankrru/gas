import $ from jquery;

const Menu = {
  init() {
    this.$el = $('.menu');
    this.$closeButton = this.$el.find('.menu__closer');
  }
  close() {}
};

export default Menu;
