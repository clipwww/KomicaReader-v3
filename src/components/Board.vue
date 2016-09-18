<template>
	<div class="col-lg-offset-1 col-lg-10">
		<div class="read-more btn btn-default btn-lg" v-on:click="toggleGridList">
			<i class="ion-ios-list"></i> 查看最新10則回覆
		</div>

		<div v-if="show" class="row grid" >
			<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 grid-item" v-for="post in komicaPosts">
				<div class="item-warp">
					<div class="item-info">No.{{ post.no }}  {{ post.name }} </div>
					<div class="item-hideNum">{{ post.totalNum }}</div>
					<div class="item-header">
						<a v-bind:href="post.imgBig" target="_blank">
							<img v-bind:src="post.imgSmall" class="img-responsive"/>
						</a>
						<div class="item-id">ID：{{ post.id }}</div>
					</div>
					<a v-link="'/detail/' + where + '/' + post.no">
						<div class="item-body">
							<div class="item-title">
								{{{ post.title }}}
							</div>
							<div class="item-content">
								{{{ post.text }}}
							</div>
						</div>
					</a>
					<div class="item-footer">
						<div class="item-datetime">
							{{ post.date }} {{ post.time }}
						</div>
					</div>
				</div>
				<div v-bind:id="post.no" v-show="isList" class="item-reply">
					<div class="item-list-wrap" v-for="reply in post.replyPost">
						<div class="item-info">
							No.{{ reply.no }}  {{ reply.name }} 
							<div class="pull-right">
								ID：{{ reply.id }}
							</div>
						</div>
						<div class="item-image">
							<a v-bind:href="reply.imgBig" target="_blank">
								<img v-bind:src="reply.imgSmall" class="img-responsive"/>
							</a>
						</div>
						<div class="item-body">
							<div class="item-title">
								{{{ reply.title }}}						
							</div>
							<div class="item-content">
								{{{ reply.text }}}
							</div>
							<div class="item-footer">
								{{ reply.date }} {{ reply.time }}
							</div>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
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
	global.$ = require('jquery');
	import Masonry from 'masonry-layout';
	import imagesLoaded from "imagesloaded";
	import InfiniteLoading   from 'vue-infinite-loading';
	import moment from "moment";
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
				show: false,
				isList: false,
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
							data.date = moment(new Date("20"+data.date)).format("YYYY/MM/DD");
							$.each(data.replyPost, function(i, replyData){
								replyData.date = moment(new Date("20"+ replyData.date))
								.format("YYYY/MM/DD");
							})
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
		                }, 200);

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
			toggleGridList(){
				var self = this;

				self.isList = self.isList ? false : true;

				if(self.isList){
					$(".grid").addClass("list");
				}else{
					$(".grid").removeClass("list");
				}
				
				setTimeout(function () {
               		self.masonryInit();
                }, 100);
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
				this.isList = false;
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

	$("body").on("click", ".qlink", function(){
		event.preventDefault()
	})

	$("body").on("click", ".js-readMore", function(){

	})
</script>