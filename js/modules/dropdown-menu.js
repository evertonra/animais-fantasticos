import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);

    //define touchstart e click como argumento padrao
    //de events caso o usuario nao defina
    if(events === undefined) this.events = ['touchstart', 'click'];
     else this.events = events;

    this.activeClass = 'active';
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  //adita o dropdownmenu e adiciona
  //a função que observa fora dele
  activeDropdownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove('active');
    });
  }

  //adiciona os eventos ao dropdownmenu
  addDropdownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  } 

  init() {
    if(this.dropdownMenus.length){
      this.addDropdownMenusEvent();
    }
    return this;
  }
}
