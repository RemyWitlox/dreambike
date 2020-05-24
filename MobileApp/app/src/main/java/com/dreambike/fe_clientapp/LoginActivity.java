package com.dreambike.fe_clientapp;

import android.content.Context;
import android.content.Intent;
import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.text.Html;
import android.text.method.LinkMovementMethod;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.TextView;
import android.widget.EditText;
import android.widget.Toast;

import com.dreambike.fe_clientapp.services.HttpLoginRequest;

import org.json.JSONObject;


public class LoginActivity extends AppCompatActivity {
  private Button loginBtn;
  private TextView infoTxt;
  private EditText usernameTxt;
  private EditText passwordTxt;
  private TextView registerTxt;
  private String username;
  private String password;
  private String baseUrl;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_login);

    baseUrl = "http://192.168.1.110:2020/login";

    infoTxt = findViewById(R.id.infoTxt);
    usernameTxt = findViewById(R.id.username);
    passwordTxt = findViewById(R.id.password);
    loginBtn = findViewById(R.id.loginBtn);
    registerTxt = findViewById(R.id.registerTxt);
    textToLink(registerTxt, "https://www.google.com", "Register here.");

    loginBtn.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        v.clearFocus();
        hideKeyboardFrom(v);

        // Display the progress bar.
        findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);

        if (usernameTxt.getText().toString().isEmpty() || passwordTxt.getText().toString().isEmpty()){
          infoTxt.setText("Please enter your username and password.");
        } else {
          try {
            username = usernameTxt.getText().toString();
            password = passwordTxt.getText().toString();

            String uri = new Uri.Builder()
              .scheme("http")
              .encodedAuthority("192.168.1.110:2020")
              .path("login")
              .appendQueryParameter("username", username)
              .appendQueryParameter("password", password)
              .build().toString();

            String result;
            HttpLoginRequest getRequest = new HttpLoginRequest();
            result = getRequest.execute(uri).get();

            if (result.isEmpty()){
              infoTxt.setText("Username/Password incorrect, please try again.");
              Toast.makeText(getApplicationContext(), "Login Failed", Toast.LENGTH_LONG).show();
            } else {
              // Write the access token of the result:
              SharedPreferences pref = getApplicationContext().getSharedPreferences("MyPref", 0); // 0 - for private mode
              SharedPreferences.Editor editor = pref.edit();
              JSONObject obj = new JSONObject(result);
              String access_token = obj.getString("access_token");
              editor.putString("access_token", access_token);
              editor.commit();
              Log.e("Access_token from Pref", pref.getString("access_token", null));
              // Remove the progress bar and continue.
              findViewById(R.id.loadingPanel).setVisibility(View.GONE);
              Toast.makeText(getApplicationContext(), "Welcome " + username, Toast.LENGTH_LONG).show();
              openMain();
            }

          } catch (Exception ex) {
            findViewById(R.id.loadingPanel).setVisibility(View.GONE);
            infoTxt.setText("Your username or password is incorrect.");
            hideKeyboardFrom(v);
          }
        }
      }
    });
  }

  public void textToLink(TextView textview, String url, String show){
    textview.setClickable(true);
    textview.setMovementMethod(LinkMovementMethod.getInstance());
    String text = "<a href='"+ url + "'>"+ show + "</a>";
    textview.setText(Html.fromHtml(text));
  }

  public void hideKeyboardFrom(View view) {
    InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
    imm.toggleSoftInput(InputMethodManager.HIDE_IMPLICIT_ONLY, 0);
  }

  public void openMain() {
    Intent intent = new Intent(this, MainActivity.class);
    startActivity(intent);
    overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
  }
}
