import * as firebase from './Auth/config';
class Fire{
    constructor(){
        //firebase.initializeApp(FirebaseKeys);
    }
    addPost = async ({text,localUri})=>{
        const remoteUri = await this.uploadPhotoAsync(localUri,'photos/${this.uid}/${Date.now()}')

        return new Promise((res,rej)=>{
            this.firestore.collection("posts").add({
                text,
                uid:this.uid,
                timestamp:this.timestamp,
                image: remoteUri
            })
            .then(ref=>{
                res(ref);

            })
            .catch(error =>{
                rej(error);
                 
            });
        });
    };
    uploadPhotoAsync = async (uri,filename) =>{
       
         
        return new Promise(async(res,rej)=>{
            const response = await fetch(uri)
            const file = await response.blob()
            let upload = firebase.storage().ref(filename).put(file)
            upload.on(
                "state_changed", 
                snapshot =>{},
                err=>{
                rej(err);
            },
            async ()=>{
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
            );
        });
    };
    createUser = async user =>{
        let remoteUri = null
        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email,user.pass)
            let db = this.firestore.collection('users').doc(this.uid)

            db.set({
                username:user.username,
                email:user.email,
                usn:user.usn,
                number:user.number,
                avatar:null,
            })
            if(user.avatar){
                remoteUri = await this.uploadPhotoAsync(user.avatar,'avatars/${this.uid}')
                db.set({avatar:remoteUri},{merge:true})
            }
            
           
        }
        catch(error){
            alert("Error:",error);    
        }
    }
    signOut=()=>{
firebase.auth().signOut();
    };
    get firestore(){
        return firebase.firestore()
    }
    get uid(){
        return(firebase.auth().currentUser || {}).uid
    }
    get timestamp(){
        return Date.now()
    }
}
Fire.shared = new Fire();
export default Fire;