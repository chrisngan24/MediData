package com.example.texttemplate;

import java.io.InputStream;
import java.util.Arrays;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.protocol.HTTP;
import org.json.JSONObject;

import android.os.Bundle;
import android.os.Looper;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.telephony.SmsManager;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TableLayout;
import android.widget.Toast;

import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.InputMethodManager;

public class MainActivity extends Activity {
	
	private SharedPreferences savedSearches;
	
	private int diseaseCount = 0;
	
	private TableLayout diseaseTableLayout;
	private Spinner dropDown;
	
	private EditText text_message;
	private EditText numberOfDiseases;
	
	private Button buttonSend;
	private Button buttonAdd;
	private Button buttonClear;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		text_message = (EditText) findViewById(R.id.number_diseases);
		numberOfDiseases = (EditText) findViewById(R.id.numberOfDiseases);
		
		buttonSend = (Button) findViewById(R.id.buttonSend);
		buttonAdd = (Button) findViewById(R.id.addDisease);
		buttonClear = (Button) findViewById(R.id.clear);
		
		buttonAdd.setOnClickListener(addButtonListener);
		buttonSend.setOnClickListener(addSendListener);
		buttonClear.setOnClickListener(addClearListener);
		dropDown = (Spinner)findViewById(R.id.disease_dropdown);
		
		ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
		        R.array.disease_array, android.R.layout.simple_spinner_item);
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		dropDown.setAdapter(adapter);

		
	}

	private OnClickListener addButtonListener = new OnClickListener()
	{
		@Override
		public void onClick(View arg0) 
		{
			String diseaseSelected = dropDown.getSelectedItem().toString();
			String numberDiseases = numberOfDiseases.getText().toString();
			System.out.println(diseaseSelected);
			System.out.println(numberDiseases);
			
			append(diseaseSelected, numberDiseases);
		}
	};
	
	private OnClickListener addSendListener = new OnClickListener()
	{
		@Override
		public void onClick(View arg0) 
		{
			String msg = text_message.getText().toString();  
			String phone_number = "12247721893";
			
			try {
					SmsManager smsManager = SmsManager.getDefault();
					
					//sendJson("contacts", "2269894464", "text", "hello","https://api.sendhub.com/v1/messages/?username=2269894464&api_key=cbe14e26be8ec287ffcd544b6d00af839165a6be");
					//smsManager.sendTextMessage(phone_number, null, msg, null, null);
					Toast.makeText(getApplicationContext(), "SMS Sent!",
								Toast.LENGTH_LONG).show();
				  } catch (Exception e) {
					Toast.makeText(getApplicationContext(),
						"SMS faild, please try again later!",
						Toast.LENGTH_LONG).show();
					e.printStackTrace();
				  }

		}
	};	

	
	private OnClickListener addClearListener = new OnClickListener()
	{
		@Override
		public void onClick(View arg0) 
		{
			text_message.setText("");
		}
	};	

	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}


	protected void append(String dis, String num) {
		String text = text_message.getText().toString();
		
		if (dis == "Malaria")
			text = text + "mal:" + num + ",";
		else if (dis == "HIV")
			text = text + "hiv:" + num + ",";
		else if (dis == "Small Pox");
			text = text + "SP:" + num + ",";

		text_message.setText(text);
			
		
		// TODO Auto-generated method stub
		
	}
	
	
	

}
