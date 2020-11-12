const LoginScreen = ({navigation}) => {
   // const [uid,setUID] = useState("");
   // const [pwd,setPwd] = useState("");
   // const [secure,setSecure] = useState(true);
 
   return(
      <View style={styles.container}>
         <View style={styles.inputContainer}>
           <Text style={styles.inputLabel}>User ID</Text>
           <TextInput style={styles.textContainer}
           />
 
           <Text style={styles.inputLabel}>Password</Text>
           
           <TextInput
             style={styles.textContainer}
             secureTextEntry={true}
             textContentType="password">
           </TextInput>
            {/* <MaterialCommunityIcons name={secure ? "eye-off" : "eye"} size={24} color="black" /> */}
         
           <TouchableOpacity style={styles.loginButtonContainer}
             onPress={() => dispatch({ loggedin })}
           >
             <Text style={styles.loginButtonText}>Sign In</Text>
           </TouchableOpacity>
         </View>
      </View>
   )
 }