import React from 'react'
import { PrivyProvider } from '@privy-io/react-auth';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultPrivyProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<PrivyProvider
			appId={import.meta.env.VITE_PRIVY_APP_ID}
			config={{
				// Display email and wallet as login methods
				loginMethods: ['email', 'wallet'],
				// Customize Privy's appearance in your app
				appearance: {
					theme: 'light',
					accentColor: '#676FFF',
					logo: 'https://your-logo-url',
				},
				// Create embedded wallets for users who don't have a wallet
				embeddedWallets: {
					createOnLogin: 'users-without-wallets',
				},
			}}
		>
			{children}
		</PrivyProvider>
	)
}

export default DefaultPrivyProvider