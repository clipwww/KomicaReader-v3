<template>
	<div class="col-lg-offset-1 col-lg-10">
		<div class="row">
			<div class="col-xs-12" v-for="post in komicaPosts">
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
				</div>
				<div class="row">
					<div class="col-xs-offset-1 col-xs-11" v-for="reply in post.replyPost">
						<div class="item-warp">
							<div class="item-header">
								<img v-bind:src="reply.imgSmall" class="img-responsive"/>
							</div>
							<div class="item-body">
								<div class="item-info">
									No.{{ reply.no }}
									Name: {{ reply.name }}  
									Id: {{ reply.id }}
								</div>
								<div class="item-title">
									{{{ reply.title }}}
								</div>
								<div class="item-content">
									{{{ reply.text }}}
								</div>
							</div>
							<div class="item-footer">
								<div class="item-datetime">
									{{ reply.date }} {{ reply.time }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import $ from "jquery";
	import {router} from '../main.js';


	export default{
		data(){
			return{
				komicaPosts: [],
				where: router._currentRoute.params.where,
				res: router._currentRoute.params.res
			}
		},
		methods:{
			updatePost(){
				this.$http.get('https://komicaapi.apphb.com/api/' + this.where + "?res=" + this.res ).then((res) => {
					this.komicaPosts = res.data;
					console.log(this.komicaPosts);
					
				}).catch((err) => { console.log(err) })
			}
		},
		ready: function(){
			this.updatePost();
		}
	}
</script>