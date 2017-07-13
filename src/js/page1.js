import 'scss/base.scss';
import 'scss/page1.scss';
import img from 'img/page1.jpg';
import {hi, hello} from './message';
let app = document.getElementById('app');
app.innerText = hello;

let tpl = `
		<p>${hi} ${hello}</p>
		<img src="${img}" alt="img" width="200" />
		`;
app.innerHTML = tpl;