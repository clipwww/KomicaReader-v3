<template>
	<div class="col-sm-12">
		<div class='text-center'>

		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				quote: ''
			}
		},
		methods:{
			getQuote(){
				this.$http.get('http://localhost:3001/api/random-quote').then((res) => {
					this.quote = res.data
				}).catch((err) => { console.log(err) })
			}
		}
	}
</script>