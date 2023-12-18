// const app = require('express')();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { json } = require('express');
const { createPool } = require('mysql');
const cors = require('cors');
const e = require('express');
var admin = require("firebase-admin");
// var serviceAccount = require("./hiyab-afa75-firebase-adminsdk-u1d5s-8b73f7c912.json");
const firebaseConfig = {
  apiKey: "AIzaSyBwjaRVZSpwpP5pmfZqV4yBGImYz2hu7ZU",
  authDomain: "hiyab-afa75.firebaseapp.com",
  databaseURL: "https://hiyab-afa75-default-rtdb.firebaseio.com",
  projectId: "hiyab-afa75",
  storageBucket: "hiyab-afa75.appspot.com",
  messagingSenderId: "1002989215411",
  appId: "1:1002989215411:web:adb8b8d8f637ec36c59ac6",
  measurementId: "G-JM0EN1CT27"
};
const serviceAccount = {
  type: "service_account",
  project_id: "hiyab-afa75",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsB1ukU87a0r12\ndmw45FVQb6Xc1Pzz1uKdr5u1wPcyvpTzmRkV3sQjW5DVaS+wQrbH800sVqyiVM9W\nzfPIGMF273YuyxqxDgcO925bhivwIPCTtVMCqIHCrn6L9hG9x2Zx3czRQV+goKuo\n13iIUSJqPUopILu4PNJkwvgCSHa0fpGvaZZ499gmf1G6OwsCRsZdXZsmTRR/RC2L\nSeBsPlyaBYJIV+nFOWDUzJWL0EKjx/ptF+q2Cl2UoPivaMk6UsSM5AtRtzasMCF9\n7tsDhUzCJ2HDbbKGxcaGg9OBUTo3TWuEH4KShT43JArfOnmD6eUvo8zKipjeVVv1\ns/5PwutzAgMBAAECggEALWo13dCIRAmtnfgOgwh4o2cONRn/e4onwnRJWbbLK9jX\nbuXkkvr/8curFUQTJGfAZFINdh6dra9RG3v8lz89193I5/qTndlzsJZOypfFwruX\nd48/jmyY8SHq450/OshI+deRyk6FZdz05HqZ5fbxbHWovenX1QAtlQ9JtSSXPffa\nvBhQRqdCHELrN8RoQ/t5kJVbK52AxwKhNTSGexEQfSI9gbVznbfYbr2p6OtdCU6a\nlC30t+sJcGuxF9He2dEu1eEeaCjKAh9Lib/FCO6tB5ip9oCiFnhBB5NV3NZKazE3\npwQtuSpjoZUlTUVF/h0P8yzghi08t8f8x1p4qoykKQKBgQDniwKI2xP3W+jJ+EVJ\nrBYDETB+R1+Rn+pYiiRweosuCkLHEqM/SANjvFCtk5eamQLJZFJehp+/iZlIps4M\n91REonJUbYRTxEzGOkgYOJ4lGQhrW2ZA4Nd9i6Bxh/4situT2dltVNG5uNIcZW28\niN2SZhyLnSc8ORJBv0btk8rq6wKBgQC+MxCorRmwT4af3ZrvNQkbmgVyf37sqqPc\n1Y9axsoo7bjLHd6Mvu4AfXm2yuNztGTpu8zdraQNPRtFPYoDT656fA5pWMMPXs1l\ncYuZEFExpOiT1ItjuSVyMqwzT5e0d2H9ilxEQkdwsj5yRqelqccvreJBxpf42daO\nGbPX+3pPmQKBgQDbwNtO+F4izmBKEA/ytBjQIGhd8W+KzrOkBLhA6I1fzO1D8zRs\nwvQ0nG4Vz5Z7a+1xJn3mqO7E4ttQUMAPHk4kNek8qBSHTC9xk68JDfNKUk/jVIPf\n34Wl6fcEyYU60S9FS+VIFtBV7Eu+F6Xm4h8o6zD8cNLkHWZucBPpN/PGsQKBgClP\nOf0Iq52piBnMrcvqfvHpv+kgW9bXMQPTtnEG3/2HtC0Zba6wAU1F81uKMWB9+7Tw\nPwyenBTsArJFLWaOtdyQeSjUSHlcI8w2nxU9gAUCRillbmjYW5O0AcabMN3XWAcT\nN/rzUkTd0cZMJjlK6KIoaA3VLki0N29hkbgFPIlxAoGAZiRT7bLsycAfUdlWE2Qg\nb8IsxWquo6TxQ8Qu/LFGtt8HMWqgn7y7lsVylyMx/Urq8h0nyjtjD8UWsfWD6wWX\nRzYI7iDYOnNB3zVHHMoXf5ckmq91BircLGhT5SQNtq5AQOXoYKaUMBD3u2QERr1u\nAzrpjm3gwD+OedW/2VCiz8E=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-u1d5s@hiyab-afa75.iam.gserviceaccount.com",
  client_id: "100175646341502460531",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u1d5s%40hiyab-afa75.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hiyab-afa75-default-rtdb.firebaseio.com/"
});
// console.log(fireapp)
app.use(cors());
app.use(express.json());
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tecxoul_hiyab',
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', (req, res) => {


  let statusCode = 200;
  let message = "Welcome";
  const response = `status: ${statusCode}\n${message}\n`;
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.end(response);

});


const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});


let count = 0;
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  var socket_id = socket.id;

  if (userId && socket_id) {
    const updateSocket_id = `UPDATE users SET socket_id = ?  WHERE id = ?;`;
    pool.query(updateSocket_id, [socket_id, userId], (UpdateSocketerror, UpdateSocketresults) => {
      if (UpdateSocketerror) {
        socket.emit('generateChatId', 'ID generate Failed.')

      }
      else {
        socket.emit('generateChatId', 'ID generated.')
   
        var UpdateMessagesStatus="UPDATE  messages SET  status=2 where reciver_id=? ";
        pool.query(UpdateMessagesStatus, [userId], (UpdateMessagesStatusError, UpdateMessagesStatusresults, UpdateMessagesStatusFields) => {
          if(UpdateMessagesStatusError){
            socket.emit('status',`Leave room error: ${UpdateMessagesStatusError}`)
          }
      
      
      
          })



      }
    });

  }



  console.log("connected:", count);
  socket.emit('my_socket_id', `id:${count}socket id :${socket_id} `)

  
socket.on('joinRoom', (data) => {
  const threadId = data.threadId;
  const threadIdArray = threadId.split('-');
  const firstValue = threadIdArray[0];
  const secondValue = threadIdArray[1];
  const reversedThread = `${secondValue}-${firstValue}`;
console.log("firstValue:",firstValue,"secondValue:",secondValue,"reversedThread:",reversedThread)
  if(!threadId){
    socket.emit('joinRoomError',`Thread Id  is empty.`)
      return;
  }
  const user_id = data.senderId;
  const reciver_id = data.recieverId;
  const thread_id = threadId;
  const un_read_count = 0;
  const is_in_chat = false; // Use boolean values instead of string "false"
  const is_muted = false;
  const is_deleted = false;
  const group_id = 0; // Not using

 
  const select_sender_id="SELECT * from users where id=?";
  const select_reciver_id="SELECT * from users where id=?";
  const checkThread = "SELECT * FROM participants WHERE thread_id = ? OR thread_id = ? ";
  const firstTimeChat = "INSERT into participants(user_id, thread_id, profile_pic,un_read_count, is_in_chat, is_muted, is_deleted) Values (?, ?, ?,?, ?, ?, ?)";
  const firstTimeChat_reciever = "INSERT into participants(user_id, thread_id, profile_pic,un_read_count, is_in_chat, is_muted, is_deleted) Values (?, ?, ?,?, ?, ?, ?)";
  const insertedRecordResponse="Select * from participants where thread_id=?";
  const reciver_participent="SELECT * FROM participants WHERE user_id = ? AND thread_id = ?";
  const sender_participent="SELECT * FROM participants WHERE user_id = ? AND thread_id = ?";
  const thread_save_table="INSERT INTO threads(thread_id,avatar,is_group) VALUES(?,NULL,0)";
  const thread_save_get="SELECT * FROM threads where thread_id=?";
  const sender_profile_pic="SELECT profile_pic FROM user_media where user_id=?";
  const reciever_profile_pic="SELECT profile_pic FROM user_media where user_id=?";

  pool.query(checkThread, [threadId,reversedThread], (error, results, fields) => {
    if (error) {
      console.error('Error:', error);
      socket.emit('joinRoomError',`Check thread error  ${error}`)
    } else {
      if (results.length > 0) {
        socket.join(threadId);
        socket.emit('conversation', `Room joined successfully`);


                           // IS IN CHAT
                           var leave_room="UPDATE  participants SET is_in_chat=1 ,un_read_count=0 where user_id=? AND thread_id=? ";
                           pool.query(leave_room, [user_id,thread_id], (leave_roomError, leave_roomresults, leave_roomFields) => {
                           if(leave_roomError){
                             socket.emit('leaveRoom',`enter in chat error: ${leave_roomError}`)
                           }
                       
                             socket.emit('leaveRoom','chat opend successfully')
                       
                       
                           })
                           var UpdateMessagesStatus="UPDATE  messages SET  status=3 where sender_id=? AND thread_id=? AND reciver_id=? ";
                           pool.query(UpdateMessagesStatus, [user_id,thread_id,reciver_id], (UpdateMessagesStatusError, UpdateMessagesStatusresults, UpdateMessagesStatusFields) => {
                             if(UpdateMessagesStatusError){
                               socket.emit('leaveRoom',`Leave room error: ${UpdateMessagesStatusError}`)
                             }
                         
                         
                         
                             })

                                                                     
                           // IS IN CHAT end


      } else {
        // First-time insertion
          pool.query(sender_profile_pic, [user_id], (sender_profile_picError, sender_profile_picResults, sender_profile_picFields) => {
          if(sender_profile_picError){
            socket.emit('joinRoomError',`Sender Profile Picture  ${error}`)
            return ;
          }else{
            var profile_sender_image = (sender_profile_picResults[0] && sender_profile_picResults[0].profile_pic) ? sender_profile_picResults[0].profile_pic : null;  
            pool.query(reciever_profile_pic, [reciver_id], (reciever_profile_picError, reciever_profile_picResults, reciever_profile_picFields) => {
              if(reciever_profile_picError){
                socket.emit('joinRoomError',`Reciever Profile Picture  ${error}`)
                return ;
              }else{
                var profile_reciever_image = (reciever_profile_picResults[0] && reciever_profile_picResults[0].profile_pic) ? reciever_profile_picResults[0].profile_pic : null;  
              
                pool.query(firstTimeChat, [user_id, thread_id, profile_sender_image,un_read_count, is_in_chat, is_muted, is_deleted], (error, results, fields) => {
                  if (error) {
                    console.error('Error:', error);
                    socket.emit('joinRoomError',`first TimeChat  error  ${error}`)
                  } else {
                    // --------------------------- SENDER INSERT PARTICIPENT
                    pool.query(insertedRecordResponse, [thread_id], (insertedRecordResponseError, insertedRecordResponseResults, insertedRecordResponseFields) => {
                      if (insertedRecordResponseError) {
                          console.error('Error:', insertedRecordResponseError);
                          socket.emit('joinRoomError',`inserted Record Error  ${insertedRecordResponseError}`)
        
                      } else {
                        var participants_record = insertedRecordResponseResults[0];
                        //-------------------------------     RECIVER PARTICIPENT -------
                        pool.query(firstTimeChat_reciever, [reciver_id, thread_id, profile_reciever_image,un_read_count, is_in_chat, is_muted, is_deleted], (firstTimeChat_recieverError, firstTimeChat_recieverResults, firstTimeChat_recieverFields) => {
                            if(firstTimeChat_recieverError){
                              console.error('Error:', firstTimeChat_recieverError);
        
                            socket.emit('joinRoomError',`Reciever Record Error : ${firstTimeChat_recieverError}`)
          
                            }
                            else{
        
                            // ---------------------------  SENDER  SELECT RECORD   USER  table---------
                              pool.query(select_sender_id, [user_id], (select_sender_idError, select_sender_idresults, select_sender_idFields) => {
                                  if (select_sender_idError) {
                                      console.log(select_sender_idError);
                                      socket.emit('joinRoomError',`select sender_id  Error  ${select_sender_idError}`)
                                  } else {
                                      var sender_id_data = select_sender_idresults[0];
                                      var sender_socket_id=select_sender_idresults[0].socket_id;
                                      if(!sender_socket_id){
                                        socket.emit('joinRoomError',`Undefined sender socket id`)

                                        return 
                                      }
                                    // ----------------------- RECIEVER ID SELECT USER_ TABLE --------
                                      pool.query(select_reciver_id, [reciver_id], (select_reciever_idError, select_reciever_idresults, select_reciever_idFields) => {
                                          if (select_reciever_idError) {
                                            socket.emit('joinRoomError',`select reciever id Error  ${select_reciever_idError}`)
            
                                          } else {
                                              var reciever_id_data = select_reciever_idresults[0];
                                              var reciever_socket_id=select_reciever_idresults[0].socket_id;
                                              
                                             // --------------------- PARTICIPENT RECIEVER RECORD ----
                                             pool.query(sender_participent, [user_id,thread_id], (sender_participentError, sender_participentResults, sender_participentFields) => {
                                              if (sender_participentError) {
                                                  console.error('Error:', sender_participentError);
                                                  socket.emit('joinRoomError',`inserted Record Error  ${sender_participentError}`)
                                
                                              }else{
                                                var sender_data_participent = sender_participentResults[0];
                                                pool.query(reciver_participent, [reciver_id,thread_id], (reciver_participentError, reciver_participentResults, reciver_participentFields) => {
                                                  if (reciver_participentError) {
                                                      console.error('Error:', reciver_participentError);
                                                      socket.emit('joinRoomError',`inserted Record Error  ${reciver_participentError}`)
                                    
                                                  }
                                                  else{
                                                    var reciever_data_participent = reciver_participentResults[0];
                                                    // console.log("reciever_data_participent--",reciever_data_participent ,"sender_data_participent:",sender_data_participent)
                                                    // -----------------  THREADS TABLE 
                                                    
                                                    pool.query(thread_save_table, [threadId], (thread_save_tableError, thread_save_tableResults, thread_save_tableFields) => {
                                                    if(thread_save_tableError){
                                                      socket.emit('joinRoomError',`inserted Record Error  ${thread_save_tableError}`)
        
                                                    }
                                                    else{
                                                      pool.query(thread_save_get, [threadId], (thread_save_getError, thread_save_getResults, thread_save_getFields) => {
                                                          if(thread_save_getError){
                                                            socket.emit('joinRoomError',`inserted Record Error  ${thread_save_getError}`)
        
                                                          }
                                                          else{
                                                            const thread_save_data=thread_save_getResults[0];
                                                    

                                                        //  -----------------------   END CODE RESPONSES 
                                                        var response = {
                                                          ...thread_save_data,
                                                          messages: [],
                                                          participants: [
                                                              {
                                                                  ...sender_data_participent,
                                                                  user: sender_id_data
                                                              },
                                                              {
                                                                ... reciever_data_participent,
                                                                  user: reciever_id_data
                                                              }
                                                          ]
                                                      };
                                                      
                                                    
                                                        socket.join(threadId);
                                                        // socket.emit('conversation', response);
                                                        socket.to(reciever_socket_id).emit('conversation', response);
                                                        io.to(sender_socket_id).emit('conversation', response);
                          
                                                    // IS IN CHAT
                                                    var leave_room="UPDATE  participants SET  is_in_chat=1,un_read_count = 0 where user_id=? AND thread_id=? ";
                                                    pool.query(leave_room, [user_id,thread_id], (leave_roomError, leave_roomresults, leave_roomFields) => {
                                                    if(leave_roomError){
                                                      socket.emit('leaveRoom',`Leave room error: ${leave_roomError}`)
                                                    }
                                                
                                                
                                                
                                                    })
                                                    var UpdateMessagesStatus="UPDATE  messages SET  status=3 where sender_id=? AND thread_id=? AND reciver_id=? ";
                                                    pool.query(UpdateMessagesStatus, [user_id,thread_id,reciver_id], (UpdateMessagesStatusError, UpdateMessagesStatusresults, UpdateMessagesStatusFields) => {
                                                      if(UpdateMessagesStatusError){
                                                        socket.emit('leaveRoom',`Leave room error: ${UpdateMessagesStatusError}`)
                                                      }
                                                  
                                                  
                                                  
                                                      })

                                                                                              
                                                    // IS IN CHAT end


                                                          }
        
                                                      })
        
        
        
                                                    }
                                                    });
                                                    
                                                    
                                                  
                                                  }
                                                });
                                          
                                              }
                                            });
                                  
                                          }
                                      });
                                  }
                              });
        
                              
                            }
        
                       
                        })
                         
                      }
                  });
                  
                  
                    
                    }
                    
                });
            //  first time chat end
              
              
              
              }
            })




       
         
          }

        })

      
      }
    }
  });

  // Notify the other user to join the same room
});


  // ---------------------------------- SEND MESSAGE -------------------------//

//   socket.on('sendMessage', (data) => {
//     const sender_socket_id_query = "SELECT socket_id FROM users WHERE id = ?";
//     const reciever_socket_id_query = "SELECT socket_id FROM users WHERE id = ?";
//     const message_save_query = "INSERT INTO messages (thread_id, sender_id, reply, is_forward, status, message, sent, reciver_id,type,image,video,audio,file,location,message_at) VALUES (?, ?, ?, NULL, ?, ?, 1, ?,?,?,?,?,?,?,?)";
//     const get_inserted_message_query = "SELECT * FROM messages WHERE sender_id = ? AND reciver_id = ? AND thread_id = ? ORDER BY id DESC LIMIT 1";
//     const last_message_first="INSERT INTO last_message (message_id,thread_id, sender_id, reply, is_forward, status, message, sent, reciver_id,type,image,video,audio,file,location,message_at) VALUES (?,?, ?, ?, NULL, ?, ?, 1, ?,?,?,?,?,?,?,?)";
//     const check_last_message = "SELECT id FROM last_message WHERE sender_id = ? AND reciver_id = ? AND thread_id = ?";
//     const update_last_message = ` UPDATE last_message  SET message_id=?, thread_id = ?, sender_id = ?,  reply = ?, is_forward = NULL,  status = ?, message = ?, sent = 1,reciver_id = ?, type = ?, image = ?, video = ?,audio = ?,file = ?,location = ?, message_at = ? 
//      WHERE 
//         sender_id = ? 
//         AND reciver_id = ? 
//         AND thread_id = ?
// `;
//     const sender_user_data="SELECT id,name,device_token FROM users WHERE id = ?";

//     const senderId = data.senderId;
//     const recieverId = data.recieverId;
//     const thread_id = data.threadId;
//     var status = 1;
//     const type = data.type;
//     var message_firebase=data.message;
//     const message_at=data.messageAt;
//     if (message_at === null) {
//       socket.emit('sendMessageError', 'Message at field is null');
//       return;
//     }
//     const reply = (data.reply !== null) ? data.reply : null;
//     const message = (type === 'text') ? data.message : null;
//     const image = (type === 'image') ? data.message : null;
//     const video = (type === 'video') ? data.message : null;
//     const audio = (type === 'audio') ? data.message : null;
//     const file = (type === 'file') ? data.message : null;
//     const location = (type === 'location') ? data.message : null;

//     pool.query(sender_socket_id_query, [senderId], (SenderSocketerror, senderSocketresults) => {
//       if (SenderSocketerror) {
//         socket.emit('sendMessageError', `sender Id error:${SenderSocketerror}`);
//       } else {
//         const db_socket_sender_id = senderSocketresults[0]?.socket_id || null;

//         pool.query(reciever_socket_id_query, [recieverId], (RecieverSocketerror, RecieverSocketresults) => {
//           if (RecieverSocketerror) {
//             socket.emit('sendMessageError', `Reciver Id error:${RecieverSocketerror}`);
//             console.log('error', RecieverSocketerror);
//           } else {
//             const db_socket_reciver_id = RecieverSocketresults[0]?.socket_id || null;
//             if(db_socket_reciver_id){
//               status=2
//             }
//             pool.query(message_save_query,
//               [
//                 thread_id, senderId, reply,status, message, recieverId, type, image, video, audio, file, location ,message_at
//               ],

//               (message_saveError, message_saveResults, message_saveFields) => {
//                 if (message_saveError) {
//                   console.error('Error inserting into messages table:', message_saveError);
//                   socket.emit('sendMessageError', `message save Error:${message_saveError}`);
//                 } else {
//                   // Fetch the inserted message with additional checks
//                   pool.query(get_inserted_message_query, [senderId, recieverId, thread_id], (fetchError, fetchResults, fetchFields) => {
//                     if (fetchError) {
//                       console.error('Error fetching inserted message:', fetchError);
//                       socket.emit('sendMessageError', `Error fetching inserted message:${fetchError}`);
//                     } else {
//                       const insertedMessage = fetchResults[0];
//                       const insertedMessageId=insertedMessage.id;
//                       console.log("insertedMessageId:-------------------------",insertedMessageId)
//                       if (insertedMessage) {
//                       // -------------------- check last message -----------
//                       pool.query(check_last_message, [senderId, recieverId, thread_id], (check_last_Error, check_last_Results, check_last_Fields) => {
//                           if(check_last_Error){
//                             socket.emit('sendMessageError', `Check las message:${check_last_Error}`);
//                           }

//                           var is_message = check_last_Results.length > 0 ? check_last_Results[0] : null;   
//                             console.log(is_message)
                      
//                            ///////// ------------------ UPDATE  LAST MESSAGE ------------- //////////
//                             if(is_message!=null){

//                               pool.query(update_last_message, 
//                                 [
//                                   insertedMessageId,thread_id, senderId, reply,status, message, recieverId, type, image, video, audio, file, location ,message_at,senderId,recieverId,thread_id
//                                 ]
//                                 , (update_Error, update_Results, update_Fields) => {
//                                 if (update_Error) {
//                                     socket.emit('updateMessageError', `Update last message: ${update_Error}`);
//                                 } else {
//                                     // Check if any rows were affected by the update
//                                     if (update_Results.affectedRows > 0) {
//                                       socket.to(db_socket_reciver_id).emit('newMessage', insertedMessage);
//                                       io.to(db_socket_sender_id).emit('newMessage', insertedMessage);

//                                        //--------------------------- FIREBASE ----------------------------
//                                         // -----------------------------update-------------------------------------
//                                         pool.query(sender_user_data, [senderId], (sender_user_dataError, sender_user_dataresults, sender_user_dataFields) => {
//                                           if(sender_user_dataError){
//                                             socket.emit('sendMessageError', `Noficfication message error:${sender_user_dataError}`);
//                                           }
//                                           else{

//                                               var user_name = sender_user_dataresults.length > 0 ? sender_user_dataresults[0].name : null;   
//                                               // var user_device_token = sender_user_dataresults.length > 0 ? sender_user_dataresults[0].device_token : null;   
//                                               var user_device_token ="dFqAHwvgSFqI6Ar_espxG8:APA91bHwjjHYjsO1aZ4IV_kwF0Nm20Bs3_cIMAJml64EjLHcjXQYPjyAbNIqeAd_Vy2mhBxCYjhi34hl24WglaJNgIf1FU_9WQkuJJrzwkgtK4R0jXJgUhu-4C9szRAXmAcXE3Wvam21";
//                                               console.log("name:",user_name,"user_device_token:",user_device_token);
                                            
                                           
                                              
                                           
                                    
                                            
                                              

//                                           }

//                                         })

                                       




//                                       //------------------------------------------UPDATE-------------------------------
//                                       //--------------------------------------------------------------------------





//                                     } else {
//                                         // No rows were affected, meaning the record with the specified conditions wasn't found
//                                         console.log('No matching message found for update');
//                                     }
//                                 }
//                             });
//                             }                           

//                             else{

//                       // -------------------- insert first last message ------------
//                                   pool.query(last_message_first,
//                                     [
//                                       insertedMessageId,thread_id, senderId, reply,status, message, recieverId, type, image, video, audio, file, location ,message_at
//                                     ]
//                                     ,(last_messageError, last_messageResults, last_messageFields) => {
//                                       if(last_messageError){
//                                         socket.emit('sendMessageError', `Last message Insert error:${last_messageError}`);
//                                       }
//                                       else{
//                                         // console.log(`id ${senderId}: sender_id:${db_socket_sender_id} ,id_rec ${recieverId} reciever_id:${db_socket_reciver_id}`);
          
//                                         socket.to(db_socket_reciver_id).emit('newMessage', insertedMessage);
//                                         io.to(db_socket_sender_id).emit('newMessage', insertedMessage);
          
//                                         //--------------------------- FIREBASE ----------------------------
//                                         // ------------------------------------------------------------------
//                                         pool.query(sender_user_data, [senderId], (sender_user_dataError, sender_user_dataresults, sender_user_dataFields) => {
//                                           if(sender_user_dataError){
//                                             socket.emit('sendMessageError', `Noficfication message error:${sender_user_dataError}`);
//                                           }
//                                           else{

//                                               var user_name = sender_user_dataresults.length > 0 ? sender_user_dataresults[0] : null;   
                                           
//                                               var user_device_token ="dFqAHwvgSFqI6Ar_espxG8:APA91bHwjjHYjsO1aZ4IV_kwF0Nm20Bs3_cIMAJml64EjLHcjXQYPjyAbNIqeAd_Vy2mhBxCYjhi34hl24WglaJNgIf1FU_9WQkuJJrzwkgtK4R0jXJgUhu-4C9szRAXmAcXE3Wvam21";

                                           
//                                             sendNotifiaction(user_device_token, "message")
//                                           }

//                                         })

                             



//                                       //-------------------------------------------------------------------------
//                                       //--------------------------------------------------------------------------
//                                       }
          
          
//                                   });
//                             }
                    
//                         // end insert last message
                      
//                       })

//                       } else {
//                         console.error('No matching message found for the given sender, receiver, and thread IDs');
//                         socket.emit('sendMessageError', 'No matching message found for the given sender, receiver, and thread IDs');
//                       }
//                     }
//                   });
//                 }
//               });
//           }
//         });
//       }
//     });
//   });

//  //-----------------------------------------------  LAST MESSAGE BASED ON ID  --------------------------------------
//   socket.on('recoverMessage',(data)=>{
//     const get_last_messages="select * from messages where thread_id=? AND id >= ?  ";
//     const message_id=data.messageId;
//     const message_thread_id=data.threadId;

//     if(!message_id){
//       socket.emit('recoverMessageError', `message ID is empty`)
//       return;

//     }
//     if(!message_thread_id){
//       socket.emit('recoverMessageError', `Thread ID is empty`)
//       return;
//     }
//             // ---- LAST MESSAGE FETCH ------ //   
//      pool.query(get_last_messages, [message_thread_id,message_id], (get_last_messagesError, get_last_messagesresults, get_last_messagesFields) => {
//       if(get_last_messagesError){
//         socket.emit('recoverMessageError', `Last message id fetch error:${get_last_messagesError}`)
//         return;
//       }
//       else{
//       var message_found_id = get_last_messagesresults.length > 0 ? get_last_messagesresults : null;   
//         if(message_found_id == null){
//           socket.emit('recoverMessageError', `This message id not found`)

//           return ;
//         }
//         socket.emit('recoverMessages', message_found_id);

//       }
//     })

//   })

//  //----------------------------------------------- END LAST MESSAGE BASED ON ID   --------------------------------------

// ------------------------------------------------- LEAVE ROOM
  socket.on('leaveRoom',(data)=>{
   var leave_room="UPDATE  participants SET is_in_chat=0,un_read_count=0 where user_id=? AND thread_id=? ";
   var userId= data.senderId;
   var thread_id=data.threadId;
   if(!userId || !thread_id){
    socket.emit('leaveRoom','Invalid parameters! user id or thread id missing')

   }
   pool.query(leave_room, [userId,thread_id], (leave_roomError, leave_roomresults, leave_roomFields) => {
    if(leave_roomError){
      socket.emit('leaveRoom',`Leave room error: ${leave_roomError}`)
    }

      socket.emit('leaveRoom','Room leaved successfully')


   })


  })

//////////////////////////////////////////////////////////    SEND WITH UNREAD          ////////////////////////////////////////



// socket.on('sendMessage', (data) => {
//   const sender_socket_id_query = "SELECT socket_id FROM users WHERE id = ?";
//   const reciever_socket_id_query = "SELECT socket_id,name FROM users WHERE id = ?";
//   const message_save_query = "INSERT INTO messages (thread_id, sender_id, reply, is_forward, status, message, sent, reciver_id,type,image,video,audio,file,location,message_at) VALUES (?, ?, ?, NULL, ?, ?, 1, ?,?,?,?,?,?,?,?)";
//   const get_inserted_message_query = "SELECT * FROM messages WHERE sender_id = ? AND reciver_id = ? AND thread_id = ? ORDER BY id DESC LIMIT 1";
//   const last_message_first="INSERT INTO last_message (thread_id, sender_id, reply, is_forward, status, message, sent, reciver_id,type,image,video,audio,file,location,message_at) VALUES (?, ?, ?, NULL, ?, ?, 1, ?,?,?,?,?,?,?,?)";
//   const check_last_message = "SELECT id FROM last_message WHERE sender_id = ? AND reciver_id = ? AND thread_id = ?";
//   const update_last_message = ` UPDATE last_message  SET thread_id = ?, sender_id = ?,  reply = ?, is_forward = NULL,  status = ?, message = ?, sent = 1,reciver_id = ?, type = ?, image = ?, video = ?,audio = ?,file = ?,location = ?, message_at = ? 
//    WHERE 
//       sender_id = ? 
//       AND reciver_id = ? 
//       AND thread_id = ?
// `;
//   const update_unread_count = "UPDATE participants SET un_read_count = un_read_count + 1 WHERE thread_id = ? AND user_id = ? AND is_in_chat=0";
//   const reciver_participent_isInChat="SELECT is_in_chat FROM participants WHERE user_id = ? AND thread_id = ?";

  
//   const senderId = data.senderId;
//   const recieverId = data.recieverId;
//   const thread_id = data.threadId;

//   const type = data.type;
//   const message_at=data.messageAt;
//   if (message_at === null) {
//     socket.emit('sendMessageError', 'Message at field is null');
//     return;
//   }
//   const reply = (data.reply !== null) ? data.reply : null;
//   const message = (type === 'text') ? data.message : null;
//   const image = (type === 'image') ? data.message : null;
//   const video = (type === 'video') ? data.message : null;
//   const audio = (type === 'audio') ? data.message : null;
//   const file = (type === 'file') ? data.message : null;
//   const location = (type === 'location') ? data.message : null;

//   var status=1;
//   pool.query(reciver_participent_isInChat, [recieverId, thread_id], (reciver_participent_isInChatError, reciver_participent_isInChatResults, reciver_participent_isInChatFields) => {
//     if (reciver_participent_isInChatError) {
//         socket.emit('unreadCountError', `inserted Record Error  ${reciver_participent_isInChatError}`);
//         return;
//     }

//     const is_in_chat_reciever = reciver_participent_isInChatResults[0]?.is_in_chat || null;

//     if (is_in_chat_reciever == 0) {
//         status = 2;
//     } else if (is_in_chat_reciever ==1) {
//         status = 3;
//     } 



//   pool.query(reciver_participent_isInChat, [recieverId,thread_id], (reciver_participent_isInChatError, reciver_participent_isInChatResults, reciver_participent_isInChatFields) => {
//     if (reciver_participent_isInChatError) {
//     socket.emit('unreadCountError',`inserted Record Error  ${reciver_participent_isInChatError}`)
//         return;
//         }
//         const is_in_chat_reciever = reciver_participent_isInChatResults[0]?.is_in_chat || null;
//         if(is_in_chat_reciever==1){
        



//         }
//       })


//   pool.query(sender_socket_id_query, [senderId], (SenderSocketerror, senderSocketresults) => {
//     if (SenderSocketerror) {
//       socket.emit('sendMessageError', `sender Id error:${SenderSocketerror}`);
//     } else {
//       const db_socket_sender_id = senderSocketresults[0]?.socket_id || null;

//       pool.query(reciever_socket_id_query, [recieverId], (RecieverSocketerror, RecieverSocketresults) => {
//         if (RecieverSocketerror) {
//           socket.emit('sendMessageError', `Reciver Id error:${RecieverSocketerror}`);
//           console.log('error', RecieverSocketerror);
//         } else {
//            const db_socket_reciver_id = RecieverSocketresults[0]?.socket_id || null;
//            const db_reciver_name = RecieverSocketresults[0]?.name || null;

//            if(!db_socket_reciver_id){
//                   status=1;
                 
                 
//               }
//           pool.query(message_save_query,
//             [
//               thread_id, senderId, reply,status, message, recieverId, type, image, video, audio, file, location ,message_at
//             ],

//             (message_saveError, message_saveResults, message_saveFields) => {
//               if (message_saveError) {
//                 console.error('Error inserting into messages table:', message_saveError);
//                 socket.emit('sendMessageError', `message save Error:${message_saveError}`);
//               } else {

         


//                 // Fetch the inserted message with additional checks
//                 pool.query(get_inserted_message_query, [senderId, recieverId, thread_id], (fetchError, fetchResults, fetchFields) => {
//                   if (fetchError) {
//                     console.error('Error fetching inserted message:', fetchError);
//                     socket.emit('sendMessageError', `Error fetching inserted message:${fetchError}`);
//                   } else {
//                     const insertedMessage = fetchResults[0];
//                     if (insertedMessage) {
//                     // -------------------- check last message -----------
//                     pool.query(check_last_message, [senderId, recieverId, thread_id], (check_last_Error, check_last_Results, check_last_Fields) => {
//                         if(check_last_Error){
//                           socket.emit('sendMessageError', `Check las message:${check_last_Error}`);
//                         }

//                         var is_message = check_last_Results.length > 0 ? check_last_Results[0] : null;   

//                          ///////// ------------------ UPDATE  LAST MESSAGE ------------- //////////
//                           if(is_message!=null){

//                             pool.query(update_last_message, 
//                               [
//                                 thread_id, senderId, reply,status, message, recieverId, type, image, video, audio, file, location ,message_at,senderId,recieverId,thread_id
//                               ]
//                               , (update_Error, update_Results, update_Fields) => {
//                               if (update_Error) {
//                                   socket.emit('updateMessageError', `Update last message: ${update_Error}`);
//                               } else {
//                                   // Check if any rows were affected by the update
//                                   if (update_Results.affectedRows > 0) {
//                                     io.to(db_socket_sender_id).emit('newMessage', insertedMessage);
                                   
//                                     const reciver_participent="SELECT * FROM participants WHERE user_id = ? AND thread_id = ?";
//                                     pool.query(reciver_participent, [recieverId,thread_id], (reciver_participentError, reciver_participentResults, reciver_participentFields) => {
//                                       if (reciver_participentError) {
//                                       socket.emit('unreadCountError',`inserted Record Error  ${reciver_participentError}`)
//                                           return;
//                                           }
//                                           const is_in_chat_reciever = reciver_participentResults[0]?.is_in_chat || null;
//                                       if(is_in_chat_reciever==1){
//                                         socket.to(db_socket_reciver_id).emit('newMessage', insertedMessage);

//                                       }else{
                              
// //////////////////////////////////    UNREAD MESSAGE      ///////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       const update_unread_count = "UPDATE participants SET un_read_count = un_read_count + 1 WHERE thread_id = ? AND user_id = ? AND is_in_chat=0";
                 
//                                       pool.query(update_unread_count, [thread_id,recieverId], (update_unread_countError, update_unread_countresults, update_unread_countFields) => {
//                                         if(update_unread_countError){
//                                           socket.emit('unreadCountError', `Unread Count increment  error:${update_unread_countError}`)
//                                         console.log('error 1')
//                                         } 
//                                         else{
//                                           // -======================================--------------
                                      
                                         
//                                           const select_sender_id="SELECT * from users where id=?";
//                                           const select_reciver_id="SELECT * from users where id=?";
//                                           const sender_participent="SELECT * FROM participants WHERE user_id = ? AND thread_id = ?";
//                                           const thread_save_get="SELECT * FROM threads where thread_id=?";
                                     
                                                                    
//                                                 pool.query(select_sender_id, [senderId], (select_sender_idError, select_sender_idresults, select_sender_idFields) => {
//                                                 if(select_sender_idError){
//                                                   socket.emit('unreadCountError',` sender Id Error:${select_sender_idError}`)
//                                                console.log("select_sender_idError",select_sender_idError)
//                                                 }
//                                                 else{
//                                                   //---------------------- SELECT SENDER ID DATA  USERS-------------
//                                                   var select_sender_idresults = select_sender_idresults.length > 0 ? select_sender_idresults : null;  
//                                                   var sender_id_data= select_sender_idresults[0];
//                                                   var sender_socket_id=select_sender_idresults[0].socket_id;
//                                                   var sender_name=select_sender_idresults[0].name;
                                                
                                  
//                                                  if(select_sender_idresults == null){
//                                                   socket.emit('unreadCountError',` Select sender Id Error`)
//                                                   console.log("select_sender_idresults",select_sender_idresults)

                                  
//                                                  }else{
//                                                   // -------------------SELECT RECEIVER ID DATA  USERS--------------//
                                                  
//                                                   pool.query(select_reciver_id, [recieverId], (select_reciever_idError, select_reciever_idresults, select_reciever_idFields) => {
//                                                       if (select_reciever_idError) {
//                                                     socket.emit('unreadCountError',`select reciever id Error  ${select_reciever_idError}`)
                                                            
//                                                     }else{
//                                                    var reciever_id_data = select_reciever_idresults[0];
//                                                    var reciever_socket_id=select_reciever_idresults[0].socket_id;
                                                  
                                                 
//                                                 //------------------------------- PARTICIPENT -------
                                                
//                                                  // --------------------- PARTICIPENT SENDER RECORD ----
//                                                pool.query(sender_participent, [senderId,thread_id], (sender_participentError, sender_participentResults, sender_participentFields) => {
//                                                 if (sender_participentError) {
//                                                     console.error('Error:', sender_participentError);
//                                                     socket.emit('unreadCountError',`inserted Record Error  ${sender_participentError}`)
                                  
//                                                 }else{
//                                                   var sender_data_participent = sender_participentResults[0];
                                  
                                  
//                                                // ---------------------- RECIVER PARTICEPENT DATA ---------------
                                  
                                            
                                               
//                                                   var reciever_data_participent = reciver_participentResults[0];
//                                          //-------------------------------------THREAD RECORD ----------------------- 
                                      
//                                          pool.query(thread_save_get, [thread_id], (thread_save_getError, thread_save_getResults, thread_save_getFields) => {
//                                           if(thread_save_getError){
//                                                  socket.emit('unreadCountError',`inserted Record Error  ${thread_save_getError}`)
                                          
//                                              }
//                                             else{
//                                             const thread_save_data=thread_save_getResults[0];
//                                                                                       //  -----------------------   END CODE RESPONSES 
//                                                 var response = {
//                                             ...thread_save_data,
//                                                 messages: [],
//                                                         participants: [
//                                                    {
//                                                      ...sender_data_participent,
//                                                   user: sender_id_data
//                                                      },
//                                                     {
//                                                         ... reciever_data_participent,
//                                                         user: reciever_id_data
//                                                       }
//                                                            ]
//                                                     };
                                                               
//                                               if(db_socket_reciver_id){
//                                                 socket.to(reciever_socket_id).emit('unreadCount', response);
//                                                 if(type=="text"){
//                                                   var notifications={
//                                                     sender_name,                                               
//                                                       message                                                                                                                                                  
//                                                    }   
//                                                  }
//                                                  if(type !=="text"){
//                                                   var notifications={
//                                                     sender_name,                                               
//                                                     type: capitalizeFirstLetter(type)                                                                                                                                                  
//                                                    }  
  
//                                                  }
//                                                socket.to(reciever_socket_id).emit('notification', notifications);
//                                                }
//                                              io.to(sender_socket_id).emit('unreadCount', response);

                                               
                                            
                                      
                                      
//                                             // socket.emit('unreadCount',response)
                                      
//                                          }
//                                               })//
                                             
                                              
                                  
                                  
                                  
                                  
//                                                 }
                                  
//                                               })
                                  
                                          
                                  
//                                                 }
//                                                 });
//                                                             //  end RECIVER ID DATA ------------------
                                  
//                                                  }
                                  
//                                                 }
//                                                 })
                                  
                                                                
//                                        }
                                  
                                                          
//                                      });      
//                                     }
//                                   })
//  ///////////////////////////////////////////////////////////////////////////////////////////
//  /////////////////////////////////////////////////////////////////////////////////////////////////
//  //////////////////////////////////////// UNREAD MESSAGE ///////////////////////////////////////////////////////////
                                  
                                  

                                  
                                      











                                    
//                                   } else {
//                                       // No rows were affected, meaning the record with the specified conditions wasn't found
//                                       console.log('No matching message found for update');
//                                   }
//                               }
//                           });
//                           }                           

//                           else{
                         
//                     // -------------------- insert first last message ------------
//                                 pool.query(last_message_first,
//                                   [
//                                     thread_id, senderId, reply,status, message, recieverId, type, image, video, audio, file, location ,message_at
//                                   ]
//                                   ,(last_messageError, last_messageResults, last_messageFields) => {
//                                     if(last_messageError){
//                                       socket.emit('sendMessageError', `Last message Insert error:${last_messageError}`);
//                                     }
//                                     else{
//                                       console.log(`id ${senderId}: sender_id:${db_socket_sender_id} ,id_rec ${recieverId} reciever_id:${db_socket_reciver_id}`);
        
//                                       socket.to(db_socket_reciver_id).emit('newMessage', insertedMessage);
//                                       io.to(db_socket_sender_id).emit('newMessage', insertedMessage);
                                   
                                              
        
//                                     }
        
        
//                                 });
//                           }
                  
//                       // end insert last message
                    
//                     })

//                     } else {
//                       console.error('No matching message found for the given sender, receiver, and thread IDs');
//                       socket.emit('sendMessageError', 'No matching message found for the given sender, receiver, and thread IDs');
//                     }
//                   }
//                 });
//               }
//             });
//         }
//       });
//     }
//   });
// });
// });
// //------------------------------------------------------------------



///////////////////////////////////   Live code   =================== /////////////////////////////////
socket.on('sendMessage', (data) => {
        

  const senderId = data.senderId;
  const recieverId = data.recieverId;
  const thread_id = data.threadId;
  const type = data.type;
  const message_at=data.messageAt;
  const reply = (data.reply !== null) ? data.reply : null;
  const message = (type === 'text') ? data.message : null;
  const image = (type === 'image') ? data.message : null;
  const video = (type === 'video') ? data.message : null;
  const audio = (type === 'audio') ? data.message : null;
  const file = (type === 'file') ? data.message : null;
  const location = (type === 'location') ? data.message : null;
  var status=1;

  const message_save_query = "INSERT INTO messages (thread_id, sender_id, reply, is_forward, status, message, sent, reciver_id,type,image,video,audio,file,location,message_at) VALUES (?, ?, ?, NULL, ?, ?, 1, ?,?,?,?,?,?,?,?)";
  const check_last_message = "SELECT id FROM last_message WHERE  thread_id = ?";
  const insert_last_message="INSERT INTO last_message (thread_id, sender_id, reply, is_forward, status, message, sent, reciver_id,type,image,video,audio,file,location,message_at) VALUES (?, ?, ?, NULL, ?, ?, 1, ?,?,?,?,?,?,?,?)";
  const update_last_message = ` UPDATE last_message  SET message_id=?, thread_id = ?, sender_id = ?,  reply = ?, is_forward = NULL,  status = ?, message = ?, sent = 1,reciver_id = ?, type = ?, image = ?, video = ?,audio = ?,file = ?,location = ?, message_at = ? 
  WHERE 
     sender_id = ? 
     AND reciver_id = ? 
     AND thread_id = ?
`;
const sender_users_record = "SELECT socket_id FROM users WHERE id = ?";
const reciever_users_record = "SELECT socket_id,name FROM users WHERE id = ?";
const reciver_participent="SELECT * FROM participants WHERE user_id = ? AND thread_id = ?";
const get_inserted_message_query = "SELECT * FROM messages WHERE sender_id = ? AND reciver_id = ? AND thread_id = ? ORDER BY id DESC LIMIT 1";
const message_status_update="UPDATE messages SET status=? where reciver_id=? AND thread_id=? AND id=?"
const final_sender_participent="SELECT * FROM participants WHERE user_id = ? AND thread_id = ?";
const final_reciver_participent="SELECT * FROM participants WHERE user_id = ? AND thread_id = ?";
const thread_save_get="SELECT * FROM threads where thread_id=?";
const update_unread_count = "UPDATE participants SET un_read_count = un_read_count + 1 WHERE thread_id = ? AND user_id = ? ";
const updated_message_get="Select * from messages where id=?";

pool.query(sender_users_record, [senderId], (sender_users_recorderror, sender_users_recordresults) => {
  if (sender_users_recorderror) {
    socket.emit('sendMessage', `sender Id error:${sender_users_recorderror}`);
  }    
  const db_socket_sender_id = sender_users_recordresults[0]?.socket_id || null;
  const sender_id_data = sender_users_recordresults[0] ;
  var sender_name=sender_users_recordresults[0].name;
  pool.query(reciever_users_record, [recieverId], (reciever_users_recorderror, reciever_users_recordresults) => {
    if (reciever_users_recorderror) {
      socket.emit('sendMessage', `sender Id error:${reciever_users_recorderror}`);
    } else {
      const db_socket_reciver_id = reciever_users_recordresults[0]?.socket_id || null;
      const reciever_id_data = reciever_users_recordresults[0];


  pool.query(message_save_query,
    [
      thread_id, senderId, reply,status, message, recieverId, type, image, video, audio, file, location ,message_at
    ],
    (message_saveError, message_saveResults, message_saveFields) => {
      if (message_saveError) {
        socket.emit('sendMessage', `message save Error:${message_saveError}`);
      } 
      else {
        //////////////////////// check last message if alread available then update else create
        pool.query(check_last_message, [ thread_id], (check_last_Error, check_last_Results, check_last_Fields) => {
          if(check_last_Error){
            socket.emit('sendMessage', `Check las message:${check_last_Error}`);
          }
          var is_message = check_last_Results && check_last_Results.length > 0 ? check_last_Results[0] : null;
           ///////// ------------------ insert LAST MESSAGE if not found ------------- //////////
            if(is_message==null){
              pool.query(insert_last_message,
                [
                  thread_id, senderId, reply,2, message, recieverId, type, image, video, audio, file, location ,message_at
                ]
                ,(last_messageError, last_messageResults, last_messageFields) => {
                  if(last_messageError){
                    socket.emit('sendMessage', `Last message Insert error:${last_messageError}`);
                  }
                  else{
                    pool.query(get_inserted_message_query, [senderId, recieverId, thread_id], (fetchError, fetchResults, fetchFields) => {
                      if (fetchError) {
                        console.error('Error fetching inserted message:', fetchError);
                        socket.emit('sendMessageError', `Error fetching inserted message:${fetchError}`);
                      } else {
                        const insertedMessage = fetchResults[0];
                        const insertedMessage_id = fetchResults[0].id;
                    socket.to(db_socket_reciver_id).emit('newMessage', insertedMessage);
                    io.to(db_socket_sender_id).emit('newMessage', insertedMessage);
                      }
                    })
                  }
                })
            }
            // ----------------------- get reciver REcords  ------------------------////////
            else{

                            
                pool.query(reciver_participent, [recieverId,thread_id], (reciver_participentError, reciver_participentResults, reciver_participentFields) => {
                  if (reciver_participentError) {
                  socket.emit('sendMessage',`reciver participent Record Error  ${reciver_participentError}`)
                      
                      }else{
                        const is_in_chat_reciever = reciver_participentResults[0]?.is_in_chat || null;
                        const reciever_data_participent = reciver_participentResults[0];

                        pool.query(get_inserted_message_query, [senderId, recieverId, thread_id], (fetchError, fetchResults, fetchFields) => {
                          if (fetchError) {
                            console.error('Error fetching inserted message:', fetchError);
                            socket.emit('sendMessageError', `Error fetching inserted message:${fetchError}`);
                          } else {
                            const insertedMessage = fetchResults[0];
                            const insertedMessage_id = fetchResults[0].id;
                            
                    if(is_in_chat_reciever==1 &&  db_socket_reciver_id){
                      io.to(db_socket_sender_id).emit('status', "condition 1");

                      console.log('in_chat')
                  
                      pool.query(message_status_update, [3,recieverId,thread_id,insertedMessage_id], (message_status_updateError, message_status_updateResults, message_status_updateFields) => {
                        if (message_status_updateError) {
                        socket.emit('sendMessage',`reciver participent Record Error  ${message_status_updateError}`)
                            
                            }
                            else{                             
                              // Usage:
                              updateMessageInDatabase(pool, socket, io, insertedMessage_id, thread_id, senderId, reply, 3, message, recieverId, type, image, video, audio, file, location, message_at);
                              

                  
                            }
                          }
                          )
                    }
                   else if(is_in_chat_reciever==0  &&  db_socket_reciver_id ){
                      io.to(db_socket_sender_id).emit('status', "condition 2");

                      console.log('not in chat')

                
                       pool.query(update_unread_count, [thread_id,senderId], (update_unread_countError, update_unread_countresults, update_unread_countFields) => {
                        pool.query(message_status_update, [2,recieverId,thread_id,insertedMessage_id], (message_status_updateError, message_status_updateResults, message_status_updateFields) => {
                        if (message_status_updateError) {
                          console.log(message_status_updateError)
                        socket.emit('sendMessage',`reciver participent Record Error  ${message_status_updateError}`)
                            
                            }
                            else{

                               
                              updateMessageInDatabase(pool, socket, io, insertedMessage_id, thread_id, senderId, reply, 2, message, recieverId, type, image, video, audio, file, location, message_at);


                  
                            }
                          }
                          )
                        })



                    }

                  else{

                      io.to(db_socket_sender_id).emit('status', "condition 3");

                      pool.query(update_unread_count, [thread_id,senderId], (update_unread_countError, update_unread_countresults, update_unread_countFields) => {
                        pool.query(message_status_update, [1,recieverId,thread_id,insertedMessage_id], (message_status_updateError, message_status_updateResults, message_status_updateFields) => {
                        if (message_status_updateError) {
                          console.log(message_status_updateError)
                        socket.emit('sendMessage',`reciver participent Record Error  ${message_status_updateError}`)
                            
                            }
                            else{

                               
                              updateMessageInDatabase(pool, socket, io, insertedMessage_id, thread_id, senderId, reply, 1, message, recieverId, type, image, video, audio, file, location, message_at);


                  
                            }
                          }
                          )
                        })



                    }

                           
                    function updateMessageInDatabase(pool, socket, io, insertedMessage_id, thread_id, senderId, reply, status, message, recieverId, type, image, video, audio, file, location, message_at) {
                      console.log("status",status)
                      console.log("insertedMessage_id",insertedMessage_id)
                      pool.query(update_last_message, [
                        insertedMessage_id, thread_id, senderId, reply, status, message, recieverId, type, image, video, audio, file, location, message_at, senderId, recieverId, thread_id
                      ], (update_Error, update_Results, update_Fields) => {
                      
                        pool.query(updated_message_get, [
                          insertedMessage_id
                        ], (updated_message_Error, updated_message_get_Results, updated_message_get_Fields) => {

                          const updated_insert_message=updated_message_get_Results[0];
                     
                    
                        pool.query(final_sender_participent, [senderId, thread_id], (final_sender_participentError, final_sender_participentResults, final_sender_participentFields) => {
                        
                    
                    
                          var sender_data_participent = final_sender_participentResults[0];
                    
                          pool.query(final_reciver_participent, [recieverId, thread_id], (final_reciver_participentError, final_reciver_participentResults, final_reciver_participentFields) => {
                          
                    
                            const reciever_data_participent = final_reciver_participentResults[0];
                    
                            pool.query(thread_save_get, [thread_id], (thread_save_getError, thread_save_getResults, thread_save_getFields) => {
                              if (thread_save_getError) {
                                console.log(thread_save_getError);
                                return;
                              } else {
                                const thread_save_data = thread_save_getResults[0];
                                var response = {
                                  ...thread_save_data,
                                  messages: [],
                                  participants: [{
                                      ...sender_data_participent,
                                      user: sender_id_data
                                    },
                                    {
                                      ...reciever_data_participent,
                                      user: reciever_id_data
                                    }
                                  ]
                                };
                    
                                var notifications = {
                                  sender_name,
                                  message
                                };
                    
                                if (type !== "text") {
                                  notifications = {
                                    sender_name,
                                    type: capitalizeFirstLetter(type)
                                  };
                                }
                    
                                console.log("db_socket_reciver_id", db_socket_reciver_id);
                                socket.to(db_socket_reciver_id).emit('notification', notifications);
                                socket.to(db_socket_reciver_id).emit('conversation', response);
                                socket.to(db_socket_reciver_id).emit('newMessage', updated_insert_message);
                                io.to(db_socket_sender_id).emit('newMessage', updated_insert_message);
                              }
                            });
                          });
                        });
                      })
                      });
                    }


                      }
                    })
                  }
                })

       

            

            }
          }
            )
       


      }
    })
  } 
})
  })




})






function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
















                                 //-------------------  Message Count  End  ----------------------


  socket.on("addition", (arg1, arg2, callback) => {

    const targetSocketId = socket_id;

    // Send a message to the specified socket
    console.log({ arg1, arg2 });
    socket.emit('calculating', 'calculating...')

    socket.join(arg1);
    io.to(targetSocketId).emit(arg1, 'Your message here');

    // Check if the socket has joined the room
    if (io.sockets.adapter.rooms[arg1]) {
      console.log(`Socket has joined room: ${arg1}`);
    } else {
      console.log(`Socket has not joined room: ${io.sockets.adapter.rooms[arg1]}`);

    }

    callback({
      sum: Number(arg1) + Number(arg2)
    });
  });
  //----------------------------------

  socket.on('disconnect', () => {
    var disconnected_user = socket.id;

    if (disconnected_user) {
      const updateSocket_id = `UPDATE users SET socket_id = NULL  WHERE socket_id = ?;`;
      const get_user = `SELECT id from users Where socket_id = ?`;
      pool.query(get_user, [disconnected_user], (get_useEerror, get_userResults,get_userFields) => {
        if(get_useEerror){
         io.emit('offlineUser', get_useEerror)

        }
        else{

          var get_user_id = get_userResults.length > 0 ? get_userResults[0] : null;   
          var leave_room="UPDATE  participants SET is_in_chat=0 where user_id=? ";
         
          pool.query(leave_room, [get_user_id.id], (leave_roomError, leave_roomresults, leave_roomFields) => {
          })
         
        }

       })
      pool.query(updateSocket_id, [disconnected_user], (UpdateSocketerror, UpdateSocketresults) => {
        if (UpdateSocketerror) {
          io.emit('offlineUser', 'Something went wrong.')

        }
        else {
          io.emit('offlineUser', 'User is offline');
          count--;
          // END IS_IN_CHAT
       


        }
      });

    }
    console.log(`User with socket ID ${socket.id} disconnected`);

  });
  //-----------------------------------
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});



