<template>
	<div class="col-sm-12" style="display:flex">
		<img :src="homeImg" class="img-responsive" style="margin:auto">
	</div>
</template>

<script>
	import HomeImg from "../images/hjs93j06.png";
	export default{
		data(){
			return{
				quote: '',
				homeImg: HomeImg
			}
		},
		methods:{

		}
	}
</script>