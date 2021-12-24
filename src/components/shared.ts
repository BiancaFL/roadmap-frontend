export function downloadFile(buffer: Buffer, fileName: string) {
    const blob = new Blob([buffer.buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    
    //const tempURL = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${buffer}`;
    const tempURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = tempURL;
    tempLink.style.display = 'none';
    tempLink.setAttribute('download', fileName);
    tempLink.setAttribute('target', '_blank');
    tempLink.click();
    tempLink.remove();
}

export function convertBase64 (file: Blob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }