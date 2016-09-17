<template>
	<div>	

		<nav id="js-menu" class='menu-left'>
			<div class="menu-title">
				<a v-link="'/home'" v-on:click="changeTitle('Komica')">
					<img :src="logo">
				</a>
			</div>
			<ul class="nav" v-on:click="menuToggle()">
				<li><a v-link="'/board/news'" v-on:click="changeTitle('新番捏他')">新番捏他</a></li>
				<li><a v-link="'/board/live'" v-on:click="changeTitle('新番實況')">新番實況</a></li>
			</ul>
		</nav>

		<header>
			<h1>{{ title }}</h1>
			<div class="menu-humbuger" v-on:click="menuToggle()">
				<i class="ion-android-menu"></i>
			</div>
			<a href="https://github.com/clipwww/KomicaReader-v3" class="github" target="_blank">
				<i class="ion-social-github"></i>
			</a>
		</header>

		<div id="js-overlay" class="overlay" v-on:click="menuToggle()"></div>

		<div class='container-fluid'>
			<div class="row">
				<router-view></router-view>
			</div>
		</div>

	</div>
</template>

<script>
	import $ from "jquery";
	import Logo from "../images/komicaLogo.jpg";

	export default{
		data(){
			return {
				title: "Komica",
				logo: "dist/" + Logo
			}
		},
		methods: {
			menuToggle(){
				$("#js-menu").toggleClass("is-visible");
				$("#js-overlay").toggleClass("is-visible");
			},
			changeTitle(text){
				this.title = text;
			}
		}
	}

</script>