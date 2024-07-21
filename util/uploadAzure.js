// const uuid = require('uuid');

// async function uploadAws( data){

//     const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING; 
            
//     const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    
    
    
//     const containerName = 'premkumar88845gmailexpensetracker'; 
    
//     console.log('\nCreating container...');
//     console.log('\t', containerName);
    
    
//     const containerClient = await blobServiceClient.getContainerClient(containerName);
    
    
//     if(!containerClient.exists()){
        
//         const createContainerResponse = await containerClient.create({ access: 'container'});
//         console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
//     }
    
//     const blobName = 'expenses' + uuidv1() + '.txt';
    
    
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
//     console.log('\nUploading to Azure storage as blob:\n\t', blobName);
    
//     const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
// }


