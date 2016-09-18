<template>
	<div class="col-lg-offset-1 col-lg-10">
		<div v-if="show" class="row grid" >
			<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 grid-item" v-for="post in komicaPosts">
				<a v-link="'/detail/' + where + '/' + post.no">
					<div class="item-warp">
						<div class="item-hideNum">{{ post.hidePost }}</div>
						<div class="item-header">
							<img v-bind:src="post.imgSmall" class="img-responsive"/>
						</div>
						<div class="item-body">
							<div class="item-title">
								{{{ post.title }}}
							</div>
							<div class="item-info">
								No.{{ post.no }}
								Name: {{ post.name }}  
								Id: {{ post.id }}
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
					</div>
					<!-- <ul>
						<li v-for="reply in post.replyPost">
							{{{ reply.text }}}
						</li>
					</ul> -->
				</a>
			</div>
		</div>
		<div class="row">
			<div class="infinite-loading">
				<infinite-loading v-show="isComplete" :on-infinite="onInfinite" 
				spinner="waveDots" :distance="0">
				 	<span slot="no-more">
				 		<div v-on:click="goTop">
				 			回到頂端 <i class="ion-android-arrow-dropup-circle"></i>
				 		</div>
			    	</span>
				</infinite-loading>
			</div>
		</div>
		
	</div>
</template>

<style>
	.infinite-loading .infinite-loading-container .infinite-status-prompt{
		font-size: 2.5em;
		color: black;
		cursor: pointer;
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
				loading: false,
				show: false
			}
		},
		methods:{
			updatePost(refresh){

				if(!this.loading){
					self.loading = true;

					this.$http.get('https://komicaapi.apphb.com/api/' + this.where + "?page=" + this.page).then((res) => {

						var self = this;
						var tempArrNew = [];
						var tempArrOld = self.komicaPosts;

						$.each(res.data, function(i, data){
							tempArrNew.push(data);
							tempArrOld.push(data);
						});

						if(refresh){
							self.komicaPosts = tempArrNew;
						}else{
							self.komicaPosts = tempArrOld;
						}

						self.masonryInit();
						
						setTimeout(function () {
	                   		self.masonryInit();
		                }, 500);

						self.page += 1;

						self.loading = false;
						self.show = true;
						self.$broadcast('$InfiniteLoading:loaded');

					
					}).catch((err) => { 
						console.log(err) 
						this.$broadcast('$InfiniteLoading:complete');
					})
				}
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
				if(this.page == 0){
					this.updatePost(true);
				}else{
					this.updatePost(false);
				}
			},
			goTop(){
				$("body, html").animate({ "scrollTop": 0 }, 600);
			}
		},
		events:{
			refresh(){
				this.page = 0;
				this.updatePost(true);
				this.goTop();
				this.$broadcast('$InfiniteLoading:reset');
			}
		},
		computed:{
			where: function(){
				return this.$route.params.where;
			},
			isComplete: function(){
				return this.$children[0].isComplete;
			}
		},
		watch:{
			where : function(val, oldVal){
				this.komicaPosts = [];
				this.page = 0;
				this.show = false;
				this.goTop();
				this.$broadcast('$InfiniteLoading:reset');
				this.updatePost(true);
			}
		},
		ready: function(){
			this.updatePost(true);
		},
		components: {
			InfiniteLoading,
		},
	}

</script>