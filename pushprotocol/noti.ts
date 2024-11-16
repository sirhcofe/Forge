import { PushAPI } from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import { ethers } from 'ethers'
import * as dotenv from 'dotenv'

dotenv.config()

const main = async () => {
	const env = ENV.STAGING
	const channelSigner = new ethers.Wallet(process.env.PRIVATE_KEY as string)
	const channelUser = await PushAPI.initialize(channelSigner, {env})

	console.log('Fetch channel info')
	const channelInfo = await channelUser.channel.info()
	console.log(`Channel name: ${channelInfo.name} | Channel address: ${channelInfo.channel}`)

	console.log('Fetching channel subscribers...')
	const subscribers = await channelUser.channel.subscribers()
	console.log(`Subscribers: ${subscribers}`)

	console.log('\n Sending notfication..')
	await channelUser.channel.send([process.env.PUBLIC_KEY], {
		notification: {
			title: 'You awesome notification',
			body: 'from your amazing protocol',
		},
	})

	console.log('Notification sent')

	await channelUser.channel.setting([
		{type: 0, default: 1, description: 'Governance Notifications'},
		{
			type: 0,
			default: 1,
			description: 'Marketing Notifications',	
		},
		{type: 1, default: 5, description: 'Sales Notifications', data: {upper: 100, lower: 5}},
	])
}

main()