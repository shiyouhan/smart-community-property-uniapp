<template>
	<view>
		<divider></divider>
		
		<message-list :list="message"></message-list>
	</view>
</template>

<script>
	import messageList from "@/components/common/message-list.vue"
	export default {
		components: {
			messageList
		},
		data() {
			return {
				message: [
					{
						title: 'bihgao',
						content: 'shshusbba'
					},
					{
						title: 'bihgao',
						content: 'shshusbba'
					},
					{
						title: 'bihgao',
						content: 'shshusbba'
					},
					{
						title: 'bihgao',
						content: 'shshusbba'
					},
					{
						title: 'bihgao',
						content: 'shshusbba'
					},
					{
						title: 'bihgao',
						content: 'shshusbba'
					},
					{
						title: 'bihgao',
						content: 'shshusbba'
					}
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
