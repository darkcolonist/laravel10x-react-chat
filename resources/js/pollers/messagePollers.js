let fetchLatestEnabled = false;

export function startFetchLatest(callback){
  console.info('fetchLatest poller started');
  fetchLatestEnabled = true;
  fetchLatest(callback);
}

export function stopFetchLatest(){
  console.info('fetchLatest poller stopped');
  fetchLatestEnabled = false;
}

async function fetchLatest(callback){
  // Stop polling if the 'stopPolling' flag is set to true
  if(!fetchLatestEnabled) return;

  try {
    const response = await axios.post('message/fetch');

    // Process the response or perform any required actions
    // Call the callback function if it's provided and is a function
    if (typeof callback === 'function') {
      callback(response.data);
    }

    // Call the function recursively after a certain timeout
    setTimeout(fetchLatest, 1000, callback); // 1 second timeout
  } catch (error) {
    // Handle any errors that occurred during the request

    // Call the function recursively after a certain timeout
    setTimeout(fetchLatest, 1000, callback); // 1 second timeout
  }
}