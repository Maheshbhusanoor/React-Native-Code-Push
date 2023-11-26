# React-Native-Code-Push
React Native CodePush is a service that allows React Native developers to push updates directly to users' devices, bypassing app store submissions for faster bug fixes and feature releases.(React Native + App Center)



## Benefits:

#### Faster Updates:
Instant deployment of updates without app store submissions.

####  Reduced Review Times:
Shorter app store review times for critical updates.

#### Seamless User Experience:
Users receive updates without manual app store updates.

#### Flexible Release Management:
Control over update timing and target audiences.

#### Cost Savings:
Potential cost savings for frequent minor updates.

####  Cross-Platform Support:
Works for both Android and iOS platforms.

## Limitations:
####  JavaScript and Assets Only:
Limited to updating JavaScript code and assets.

####  Security Concerns:
Over-the-air updates raise security considerations.

#### Offline Limitations:
Requires an internet connection for update checks.

####  Potential for Breaking Changes:
Rapid updates may introduce bugs or breaking changes.

####  Platform-Specific Challenges:
Handling platform-specific configurations can be challenging.

#### Dependency on Third-Party Service:
Relies on a third-party service (Microsoft) for updates.

## Configuration Setup for React Native 0.60 version and above 

### Add App Center’s SDK to your app



1.In a terminal window opened at the root of a React Native project, enter the following line to add Crash and Analytics services to your app:

NPM : 
```
npm install appcenter appcenter-analytics appcenter-crashes --save-exact
```

Yarn : 
```
npm install appcenter appcenter-analytics appcenter-crashes --save-exact
```

### Integrate the SDK Android



2.Create a new file with the filename `appcenter-config.json` in `android/app/src/main/assets/` with the following content:

```
{
  "app_secret": "{Your app secret here}"
}
```
`Note : Copy the app secret from App Center and add it. `

3.Modify the app's `res/values/strings.xml` to include the following lines:

```
<resources>
    <string name="app_name">Your APP Name</string>
     <string moduleConfig="true" name="CodePushDeploymentKey">REPLACE_YOUR_DEPLOYMENT_KEY</string>
    <string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
    <string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>
</resources>
```

4. Add the following code in `/android/app/build.gradle`
```
apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
```

5. Add the following code in `/android/settings.gradle` at the end of the file
```
include ':app', ':react-native-code-push'
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')

```

6. Add following changes to MainApplication.Java 


`android/app/src/main/java/com/reactnativecodepush/MainApplication.java`

```
import com.microsoft.codepush.react.CodePush;

 @Override
 protected String getJSBundleFile(){
 return CodePush.getJSBundleFile();
 }
```
Code Snippet : 

<img width="884" alt="Screenshot 2023-11-26 at 7 06 09 PM" src="https://github.com/Maheshbhusanoor/React-Native-Code-Push/assets/12828834/f25b7925-5e95-4315-a8ad-68bf60350741">

### Integrate the SDK IOS

1. Add `AppCenter-Config.plist` just near the `info.plist`
   
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
    <key>AppSecret</key>
    <string>APP_SECRET_KEY</string>
    </dict>
</plist>
```

2. Add key in `info.plist`

```
<key>CodePushDeploymentKey</key>
<string>DEPLOYMENT_KEY</string>
```
<img width="715" alt="Screenshot 2023-11-26 at 9 00 22 PM" src="https://github.com/Maheshbhusanoor/React-Native-Code-Push/assets/12828834/572e2d24-c9f2-4308-852f-9b262849bd0c">




3. Update your `AppDelegate.mm`

#####  Import Headers

```
#import <CodePush/CodePush.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
```
##### Replace 
```
return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

##### With
```
    return [CodePush bundleURL];
```

##### Add the below code to the method didFinishLaunchingWithOptions


```
 [AppCenterReactNative register];
[AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
[AppCenterReactNativeCrashes registerWithAutomaticProcessing];
```

Code Snippet :

<img width="1147" alt="Screenshot 2023-11-26 at 9 08 20 PM" src="https://github.com/Maheshbhusanoor/React-Native-Code-Push/assets/12828834/5f67dce7-453e-465a-8253-7119cda2e763">



### Finally Make changes to your React Native Code :

Imports the CodePush module for enabling over-the-air updates in the React Native application.
`import codePush from 'react-native-code-push'` 

Wrap the App Component with CodePush:

 Wraps the App component with the codePush higher-order component (HOC). This enables CodePush to manage updates for this component.
`const MyApp = codePush(App)`

Code Snippet : 

<img width="580" alt="Screenshot 2023-11-26 at 7 09 40 PM" src="https://github.com/Maheshbhusanoor/React-Native-Code-Push/assets/12828834/1cffed87-d6e0-4471-a47b-15f09e70c00c">


## Releasing CodePush updates using the App Center CLI

### Install the App Center CLI

`npm install -g appcenter-cli`

###  Logging in

Run the command to login into the app center through CLI.

`appcenter login`

<img width="644" alt="Screenshot 2023-11-26 at 7 25 32 PM" src="https://github.com/Maheshbhusanoor/React-Native-Code-Push/assets/12828834/66b66390-c14c-4d1d-9774-520f812d44c0">

###  Publish your latest release to app center

Execute the App Center CLI release-react command to bundle your app's code and asset files, then publish them to the App Center server as a new release. For example:

```
appcenter codepush release-react -a <ownerName>/MyApp -d Staging
```

## CHEERS!!!!!

Official Docs :


[Get Started with the React Native](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-get-started)

[Releasing CodePush updates using the App Center CLI](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/cli)

[Command-Line Interface (CLI) Documentation](https://learn.microsoft.com/en-us/appcenter/cli/)
