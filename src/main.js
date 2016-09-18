import $ from "jquery";
import Vue from 'vue';
import App from './components/App.vue';
import Home from './components/Home.vue';
import Board from './components/Board.vue';
import Detail from './components/Detail.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import styles from './styles/base.css';
import Masonry from 'masonry-layout';

Vue.use(VueResource);

Vue.use(VueRouter);

export var router = new VueRouter();

router.map({
	'/home':{
		component: Home
	},
	'/board/:where':{
		component: Board
	},
	'/detail/:where/:res':{
		component: Detail
	}
})

router.redirect({
	'*': '/home'
})

router.start(App, '#app');

Vue.http.interceptors.push((request, next) => {

  	$("#js-loading").fadeIn(600);

  next((response) => {

  	$("#js-loading").fadeOut(600);

  });
});