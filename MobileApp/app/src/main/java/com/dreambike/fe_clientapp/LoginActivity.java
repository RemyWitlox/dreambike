package com.example.fe_clientapp;

import android.content.Intent;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.EditText;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {
  private Button loginBtn;
  private TextView infoTxt;
  private EditText username;
  private EditText password;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_login);

    infoTxt = (TextView) findViewById(R.id.infoTxt);
    username = (EditText) findViewById(R.id.username);
    password = (EditText) findViewById(R.id.password);

    loginBtn = (Button) findViewById(R.id.loginBtn);
    loginBtn.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        if (username.getText().toString().isEmpty() || password.getText().toString().isEmpty()){
          infoTxt.setText("Your username or password is incorrect.");
        } else {
          Toast.makeText(getApplicationContext(), "Hello " + username.getText().toString() + " \n" + "Please wait while we connect you to your account.", Toast.LENGTH_SHORT).show();
          openMain();
        }
      }
    });
  }

  public void openMain() {
    Intent intent = new Intent(this, MainActivity.class);
    startActivity(intent);
    overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
  }
}
