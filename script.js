// Dynamicaly download data needed

async function LoadRecordings() {
	const recordingsList = await fetch('../data/recordings.json');
	return await recordingsList.json();
}

const main = document.getElementById('main');

async function Script() {
	const recordings = await LoadRecordings();

	recordings.forEach(recording => {
		const recordingDom = document.createElement('dir');
		recordingDom.classList = ['recording'];

		const title = document.createElement('span');
		title.textContent = recording.title;
		recordingDom.appendChild(title);

		const downloadLink = document.createElement('a');
		downloadLink.href = `audio/${recording.audio.path}`;
		downloadLink.download = true;
		downloadLink.innerText = 'Download';
		recordingDom.appendChild(downloadLink);

		const audioPlayer = document.createElement('audio');
		audioPlayer.controls = true;
		audioPlayer.src = `audio/${recording.audio.path}`;
		recordingDom.appendChild(audioPlayer);

		const timestamp = document.createElement('span');
		timestamp.classList = ['timestamp'];
		timestamp.textContent = recording.timestamp;
		recordingDom.appendChild(timestamp);

		if (recording.speakers.length > 0) {
			const speakersTitle = document.createElement('h3');
			speakersTitle.textContent = 'Speakers';
			recordingDom.appendChild(speakersTitle);

			const speakersList = document.createElement('dir');
			speakersList.classList = ['speakers'];

			recording.speakers.forEach(speaker => {
				const speakerDom = document.createElement('dir');
				speakerDom.classList = ['speaker'];
				const speakerAvatar = document.createElement('img');
				speakerAvatar.src = `avatars/${speaker.avatar}`;
				speakerAvatar.alt = `${speaker.name}'s Avatar`;
				speakerDom.appendChild(speakerAvatar);

				const speakerName = document.createElement('span');
				speakerName.innerText = speaker.name;

				speakerDom.appendChild(speakerName);

				speakersList.appendChild(speakerDom);
			});

			recordingDom.appendChild(speakersList);
		}

		main.appendChild(recordingDom);
	});
}

Script();
