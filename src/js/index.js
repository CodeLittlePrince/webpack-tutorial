import 'scss/base.scss';
import 'scss/index.scss';
import img from 'img/index.jpg';
import {hi, hello} from './message';
import $ from 'jQuery';
let app = $('#app');

let tpl = `
		<p>${hi} ${hello}</p>
		<img src="${img}" alt="img" width="200" />
		`;
app.html(tpl);