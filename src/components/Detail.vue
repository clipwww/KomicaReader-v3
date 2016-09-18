<template>
	<div class="col-lg-offset-1 col-lg-10" style="margin-bottom: 60px;">
		<div class="row">
			<div class="col-xs-12" v-for="post in komicaPosts">
				<div class="item-warp">
					<div class="item-info">No.{{ post.no }}  {{ post.name }} </div>
					<div class="item-hideNum">{{ post.totalNum }}</div>
					<div class="item-header">
						<a v-bind:href="post.imgBig" target="_blank">
							<img v-bind:src="post.imgSmall" class="img-responsive"/>
						</a>
						<div class="item-id">ID：{{ post.id }}</div>
					</div>
					<div class="item-body">
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
</template>

<script>
	import $ from "jquery";
	import {router} from '../main.js';
	import moment from "moment";

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

					var tempArrNew = [];
					
					$.each(res.data, function(i, data){
						data.date = moment(new Date("20"+data.date)).format("YYYY/MM/DD");
						$.each(data.replyPost, function(i, replyData){
							replyData.date = moment(new Date("20"+ replyData.date))
							.format("YYYY/MM/DD");
						});
						tempArrNew.push(data);
					});

					this.komicaPosts = tempArrNew;
					
				}).catch((err) => { console.log(err) })
			}
		},
		ready: function(){
			this.updatePost();
		}
	}
</script>