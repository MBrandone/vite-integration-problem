# Vite-integration-problem

Repo to show vite module federation integration for the tractor-v2 exercise.

Tractor-v2 is simplfied here : 
- Only one product page is present
- The checkout process can be done for this product

What I can see :
- in the network panel, the app-shell download the remoteEntry of the decide MFE
- An error appear, remoteEntry cannot be read because of entry "import.meta.url"
