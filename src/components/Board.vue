<template>
	<div class="col-lg-offset-1 col-lg-10">
		<div class="row grid">
			<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 grid-item" v-for="post in komicaPosts">
				<a v-link="'detail/' + post.no">
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
								{{{ post.text }}}
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
	</div>
	
</template>

<script>
	import $ from "jquery";
	import Masonry from 'masonry-layout';
	import imagesLoaded from "imagesloaded";
	import {router} from '../main.js';

	// provide jQuery argument
	imagesLoaded.makeJQueryPlugin( $ );

	export default{
		data(){
			return{
				komicaPosts: [],
				where: router._currentRoute.params.where
			}
		},
		methods:{
			updatePost(){
				this.$http.get('http://komicaapi.apphb.com/api/' + this.where ).then((res) => {
					this.komicaPosts = res.data;
					console.log(this.komicaPosts);

					$('.grid').imagesLoaded(function () {
				        new Masonry( '.grid', {
							itemSelector: '.grid-item',
				            percentPosition: true
						});
				    });
					

				}).catch((err) => { console.log(err) })
			}
		},
		ready: function(){
			this.updatePost();
			
		}
	}
</script>