package com.dreambike.fe_clientapp;

import android.content.Intent;
import androidx.appcompat.app.AppCompatActivity;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
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
  private String username;
  private String password;
  private String baseUrl;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_login);

    baseUrl = "http://192.168.1.110:2020/api/test";

    infoTxt = (TextView) findViewById(R.id.infoTxt);
    usernameTxt = (EditText) findViewById(R.id.username);
    passwordTxt = (EditText) findViewById(R.id.password);
    loginBtn = (Button) findViewById(R.id.loginBtn);

    loginBtn.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        Log.e("log: ", "The button is clicked!");
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
        openMain();

      // Login Success
      if (isValidCredentials.equals("true")) {
        Log.e("log: ", "open main.");
        openMain();
      }
      // Login Failure
      else {
        Toast.makeText(getApplicationContext(), "Login Failed", Toast.LENGTH_LONG).show();
      }
    }
  }

  public void openMain() {
    Intent intent = new Intent(this, MainActivity.class);
    startActivity(intent);
    overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
  }
}
