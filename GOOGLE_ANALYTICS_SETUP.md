# Google Analytics Setup Instructions

## Setup Complete! 🎉

Google Analytics has been successfully integrated into your HKUST KSA website.

## Next Steps

1. **Get your Google Analytics Measurement ID:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property for your website (if you haven't already)
   - Copy your Measurement ID (starts with `G-`)

2. **Configure your environment:**
   - Open the `.env` file in your project root
   - Add your Measurement ID:
     ```
     PUBLIC_GA_MEASUREMENT_ID=G-YOUR_ID_HERE
     ```
   - Replace `G-YOUR_ID_HERE` with your actual Measurement ID

3. **Test locally:**
   ```bash
   npm run dev
   ```
   - Open your browser's developer tools
   - Go to the Network tab
   - Look for requests to `googletagmanager.com` to verify GA is loading

4. **Deploy to production:**
   - Make sure to set the `PUBLIC_GA_MEASUREMENT_ID` environment variable in your hosting platform (Vercel, Netlify, etc.)

## Implementation Details

- Google Analytics code has been added to `/src/layout/BaseLayout.astro`
- The implementation uses environment variables for security
- GA will only load when a valid Measurement ID is provided
- The integration is conditionally rendered (won't load if no ID is set)

## Verification

To verify Google Analytics is working:
1. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Enable the debugger and visit your site
3. Open the browser console to see GA debug messages
4. Check your Google Analytics dashboard for real-time data

## Troubleshooting

- **GA not loading:** Check that your Measurement ID is correctly set in the `.env` file
- **No data in GA:** It can take up to 24 hours for data to appear in Google Analytics
- **Console errors:** Ensure your Measurement ID format is correct (starts with `G-`)