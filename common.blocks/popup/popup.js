class Popup {
  constructor(options) {
    this.$el = $(options.el || options.src).first();
    this.$button = this.$el.find('.popup__button');
    this.active = false;
    this.callback = {};
    this.callback.opened = options.opened.bind(this);
    this.callback.closed = options.closed.bind(this);
    Popup.initCloseButton(this);
  }
  open(trigger = true) {
    if (! this.active) {
      this.active = true;
      this.$el.fadeIn();
      if (trigger) this.callback.onOpened();
    }
  }
  close(trigger = true) {
    if (this.active) {
      this.active = false;
      this.$el.fadeOut();
      if (trigger) this.callback.onClosed();
    }
  }
  toggle() {
    (this.active) ? this.close() : this.open();
  }
  static initCloseButton(popup) {
    popup.$button.on('click', (event) => {
      popup.close();
    });
  };
}
