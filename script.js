async function convertToMp3() {
   const youtubeLink = document.getElementById('youtubeLink').value;
   const progressBar = document.getElementById('progress-bar');
   const resultDiv = document.getElementById('result');
   const progressContainer = document.getElementById('progress-container');

   progressContainer.style.display = 'block'; 
   progressBar.style.width = '100%';
   
   const videoId = youtubeLink.split('v=')[1];
   
   if (!videoId) {
       resultDiv.textContent = 'Invalid YouTube link';
       resultDiv.style.display = 'block'; 
       progressContainer.style.display = 'none';
       return;
   }
   
   const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
   const options = {
       method: 'GET',
       headers: {
           'x-rapidapi-key': '491a7f1240mshfb17d28b7ecd191p1346ddjsndcfab97d1932',
           'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
       }
   };

   try {
       let result;
       do {
           const response = await fetch(url, options);
           result = await response.json();
           if (result.status === 'ok') {
               resultDiv.innerHTML = `<a href="${result.link}" download>Download MP3</a>`;
               resultDiv.style.display = 'block'; 
               break;
           } else if (result.status === 'processing') {
               await new Promise(resolve => setTimeout(resolve, 1000));
           } else {
               resultDiv.textContent = 'Failed to convert the video.';
               resultDiv.style.display = 'block'; 
               break;
           }
       } while (result.status !== 'ok');
   } catch (error) {
       resultDiv.textContent = 'Error occurred while converting the video.';
       resultDiv.style.display = 'block';
   } finally {
      progressBar.style.width = '0';
      progressContainer.style.display = 'none'; 
   }
}
