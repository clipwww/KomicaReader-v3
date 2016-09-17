<template>
	<div class="col-lg-offset-1 col-lg-10">
		<div class="row grid" >
			<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 grid-item" v-for="post in komicaPosts">
				<a v-link="'/detail/' + where + '/' + post.no">
					<div class="item-warp">
						<div class="item-header">
							<img v-bind:src="post.imgSmall" class="img-responsive"/>
						</div>
						<div class="item-body">
							<div class="item-info">
								No.{{ post.no }}
								Name: {{ post.name }}  
								Id: {{ post.id }}
							</div>
							<div class="item-title">
								{{{ post.title }}}
							</div>
							<div class="item-content">
								{{{ post.text.substring(0, 200) }}}{{ post.text.length > 200 ? "......" : nul }}
							</div>
						</div>
						<div class="item-footer">
							<div class="item-datetime">
								{{ post.date }} {{ post.time }}
							</div>
						</div>
						<!-- <ul>
							<li v-for="reply in post.replyPost">
								{{{ reply.text }}}
							</li>
						</ul> -->
					</div>
				</a>
			</div>
		</div>
		<div class="loading-icon">
			<infinite-loading :on-infinite="onInfinite"></infinite-loading>
		</div>
	</div>
</template>

<style>
	.loading-icon{
		position: fixed;
		left: 270px;
		right: 0;
		top: 80px;
		background-color: rgba(0,0,0, .8);
	}
</style>

<script>
	import $ from "jquery";
	import Masonry from 'masonry-layout';
	import imagesLoaded from "imagesloaded";
	import InfiniteLoading   from 'vue-infinite-loading';
	import {router} from '../main.js';

	// provide jQuery argument
	imagesLoaded.makeJQueryPlugin( $ );

	export default{
		data(){
			return{
				komicaPosts: [],
				where: this.$route.params.where,
				$grid: "",
				page: 0,
				show: false,
			}
		},
		methods:{
			updatePost(){
				this.$http.get('https://komicaapi.apphb.com/api/' + this.where + "?page=" + this.page).then((res) => {

					var self = this;

					$.each(res.data, function(i, data){
						self.komicaPosts.push(data);
					});

					self.masonryInit();
					this.show = true;
					
					setTimeout(function () {
                   		self.masonryInit();
	                }, 500);

					this.page += 1;

				}).catch((err) => { console.log(err) })
			},
			masonryInit(){
				this.$grid = $('.grid').imagesLoaded(function (self) {
			        new Masonry('.grid', {
						itemSelector: '.grid-item',
			            percentPosition: true
					});
			    });			    
			},
			onInfinite() {
				setTimeout(() => {
					this.updatePost();
					this.$broadcast('$InfiniteLoading:loaded');
				}, 1000);

			},
		},
		computed:{
			where: function(){
				return this.$route.params.where;
			}
		},
		watch:{
			where : function(val, oldVal){
				this.komicaPosts = [];
				this.page = 0;
				this.show = false;
				$("body, html").animate({ "scrollTop": 0 }, 600);
				this.updatePost();
			}
		},
		ready: function(){

		},
		components: {
			InfiniteLoading,
		},
	}
</script>