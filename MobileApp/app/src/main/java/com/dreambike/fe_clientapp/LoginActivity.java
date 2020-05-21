package com.dreambike.fe_clientapp;

import android.content.Context;
import android.content.Intent;
import androidx.appcompat.app.AppCompatActivity;

import android.os.AsyncTask;
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

import com.dreambike.fe_clientapp.services.ApiAuthClient;

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

    infoTxt = (TextView) findViewById(R.id.infoTxt);
    usernameTxt = (EditText) findViewById(R.id.username);
    passwordTxt = (EditText) findViewById(R.id.password);
    loginBtn = (Button) findViewById(R.id.loginBtn);
    registerTxt = (TextView) findViewById(R.id.registerTxt);
    textToLink(registerTxt, "https://www.google.com", "Register here.");

    loginBtn.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        Log.e("log: ", "The button is clicked!");
        v.clearFocus();
        hideKeyboardFrom(v);
        if (usernameTxt.getText().toString().isEmpty() || passwordTxt.getText().toString().isEmpty()){
          infoTxt.setText("Please enter your username and password.");
        } else {
          try {
            username = usernameTxt.getText().toString();
            password = passwordTxt.getText().toString();

            ApiAuthClient apiAuthClient =
              new ApiAuthClient(
                baseUrl,
                username, password
              );

            AsyncTask<Void, Void, String> execute = new ExecuteNetworkOperation(apiAuthClient);

          } catch (Exception ex) {
            infoTxt.setText("Your username or password is incorrect.");
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

  /**
   * This subclass handles the network operations in a new thread.
   * It starts the progress bar, makes the API call, and ends the progress bar.
   */
  public class ExecuteNetworkOperation extends AsyncTask<Void, Void, String> {

    private ApiAuthClient apiAuthClient;
    private String isValidCredentials;

    /**
     * Overload the constructor to pass objects to this class.
     */
    public ExecuteNetworkOperation(ApiAuthClient apiAuthClient) {
      Log.e("log: ", "Execute Network Operation.");
      this.apiAuthClient = apiAuthClient;
      execute();
    }

    @Override
    protected void onPreExecute() {
      super.onPreExecute();

      // Display the progress bar.
      Log.e("log: ", "Display progress.");
      findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
    }

    @Override
    protected String doInBackground(Void... params) {
      try {
        isValidCredentials = apiAuthClient.execute();
        Log.e("credentials: ", "valid credentials.");
      } catch (Exception e) {
        Toast.makeText(getApplicationContext(), "error", Toast.LENGTH_LONG).show();
        e.printStackTrace();
      }

      return null;
    }

    @Override
      protected void onPostExecute(String result) {
        super.onPostExecute(result);

        // Hide the progress bar.
        findViewById(R.id.loadingPanel).setVisibility(View.GONE);
        Log.e("log: ", "Hide progress.");

      // Login succeeded?
      if (isValidCredentials.isEmpty()) {
        infoTxt.setText("Username/Password incorrect, please try again.");
        Toast.makeText(getApplicationContext(), "Login Failed", Toast.LENGTH_LONG).show();
      }
      else {
        Log.e("log: ", "open main.");
        Toast.makeText(getApplicationContext(), "Welcome " + username, Toast.LENGTH_LONG).show();
        openMain();
      }
    }
  }

  public void openMain() {
    Intent intent = new Intent(this, MainActivity.class);
    startActivity(intent);
    overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
  }
}
