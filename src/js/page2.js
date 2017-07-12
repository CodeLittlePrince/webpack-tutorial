import '../scss/base.scss';
import '../scss/page2.scss';
import img from '../img/page2.png';
import {hi, hello} from './message';
let app = document.getElementById('app');
app.innerText = hello;

let tpl = `
		<p>${hi} ${hello}</p>
		<img src="${img}" alt="img" width="200" />
		`;
app.innerHTML = tpl;