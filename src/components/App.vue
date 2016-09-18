<template>
	<div>	
		<nav id="js-menu" class='menu-left'>
			<div class="menu-title">
				<a v-link="'/home'" v-on:click="menuToggle">
					<img :src="logo">
				</a>
			</div>
			<ul class="nav" v-on:click="menuToggle">
				<li><a v-link="'/board/news'">新番捏他</a></li>
				<li><a v-link="'/board/live'">新番實況</a></li>
				<li><a v-link="'/board/anime'">動畫</a></li>
				<li><a v-link="'/board/gup'">少女與戰車</a></li>
				<hr/>
				<li>
					<a href="https://github.com/clipwww/KomicaReader-v3" target="_blank">
						<i class="ion-social-github"></i> GitHub
					</a>
				</li>
			</ul>
			
		</nav>

		<header>
			<h1>{{ title }}</h1>
			<div class="menu-humbuger" v-on:click="menuToggle">
				<i class="ion-android-menu"></i>
			</div>
			<div class="refresh" v-on:click="refresh">
				<i class="ion-refresh"></i>
			</div>
		</header>

		<div id="js-overlay" class="overlay" v-on:click="menuToggle"></div>
		<div id="js-loading" class="loading-overlay"></div>

		<div class='container-fluid'>
			<div class="row">
				<router-view></router-view>
			</div>
		</div>

	</div>
</template>

<style>


</style>

<script>
	import $ from "jquery";
	import Logo from "../images/komicaLogo.jpg";
	import {router} from '../main.js';

	const titleText = {
		home: "Komica",
		news: "新番捏他",
		live: "新番實況",
		gup: "少女與戰車",
		anime: "動畫"
	};

	
	export default{
		data(){
			return {
				title: "Komica",
				logo: Logo,
				list: [],
				busy: false
			}
		},
		methods: {
			menuToggle(){
				$("#js-menu").toggleClass("is-visible");
				$("#js-overlay").toggleClass("is-visible");
			},
			changeTitle(text){
				this.title = text;
			},
			refresh(){
				this.$broadcast('refresh');
			}
		},
		computed:{
			title: function(){
				return this.$route.params.where ? titleText[this.$route.params.where] : titleText["home"]
			}
		}
	}

</script>