const url = 'http://localhost:8080/'

const classify = async (photo) => {
    try {
        const formData = new FormData();
        formData.append('image', {
            uri: photo.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });

        const response = await fetch(url + 'classify', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
        });
        console.log('Photo uploaded successfully!');
        if (response.ok) {
            text = await response.text()
            alert(text)
        } else {
            console.error('Failed to upload photo');
        }
    } catch (error) {
        console.error('Error uploading photo:', error);
    }
};
const test = async () => {
    try {
        const res = await fetch(url)
        const json = await res.text()
        console.log(json)
    } catch (err) {
        console.log(err)
    }
}

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}

export { classify, test };