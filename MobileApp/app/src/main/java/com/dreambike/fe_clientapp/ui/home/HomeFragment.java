package com.dreambike.fe_clientapp.ui.home;

import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import com.dreambike.fe_clientapp.R;
import com.dreambike.fe_clientapp.services.HttpGetRequest;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.concurrent.ExecutionException;

public class HomeFragment extends Fragment implements OnMapReadyCallback{

  private GoogleMap mGoogleMap;
  private MapView mMapView;
  private View mView;
  private String token;

  public HomeFragment (){
    // Required empty public constructor
  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    SharedPreferences pref = getContext().getApplicationContext().getSharedPreferences("MyPref", 0);
    this.token = pref.getString("access_token", null);
  }

  @Override
  public View onCreateView(@NonNull LayoutInflater inflater,
                           ViewGroup container, Bundle savedInstanceState) {
    // Inflate the layout for this fragment
    mView = inflater.inflate(R.layout.fragment_home, container, false);
    return mView;
  }

  @Override
  public void onViewCreated(View view, Bundle savedInstanceState){
    super.onViewCreated(view, savedInstanceState);

    mMapView = (MapView) mView.findViewById(R.id.map);
    if (mMapView != null){
      mMapView.onCreate(null);
      mMapView.onResume();
      mMapView.getMapAsync(this);
    }
  }

  @Override
  public void onMapReady(GoogleMap googleMap) {
    MapsInitializer.initialize(getContext());

    LatLng home = new LatLng(51.546869, 5.484493);
    mGoogleMap = googleMap;
    // Set map type
    googleMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);
    // Set a marker
    googleMap.addMarker(new MarkerOptions().position(home).title("Remy's Home").snippet("Visit anytime."));

    // Get data from backend
    try {
      String uri = new Uri.Builder()
        .scheme("http")
        .encodedAuthority("192.168.1.110:2020")
        .path("api/getAllDocking")
        .appendQueryParameter("access_token",token)
        .build().toString();

      String result;
      HttpGetRequest getRequest = new HttpGetRequest(token);

      result = getRequest.execute(uri).get();


      if (result.isEmpty()){
        Toast.makeText(getContext().getApplicationContext(), "Database unavailable", Toast.LENGTH_LONG).show();
      } else {
        // Write the access token of the result:
        Toast.makeText(getContext().getApplicationContext(), "Dockers loaded from backend", Toast.LENGTH_LONG).show();
        Log.d("result docking stations", result.toString());
        JSONArray array = new JSONArray(result);
        for (int i = 0; i < array.length(); i++) {
          JSONObject jsonObject = array.getJSONObject(i);
          String name = jsonObject.getString("name");
          String lat = jsonObject.getString("lat");
          String lng = jsonObject.getString("lng");

          HashMap<String, String> ds = new HashMap<>();

          ds.put("name", name);
          ds.put("lat", lat);
          ds.put("lng", lng);

          double lat1 = Double.parseDouble(lat);
          double lng1 = Double.parseDouble(lng);

          googleMap.addMarker(new MarkerOptions().position(new LatLng(lat1, lng1)).title(name));
        }
      }
    } catch (ExecutionException | InterruptedException | JSONException e) {
      e.printStackTrace();
    }

    // Set a position
    CameraPosition Liberty = CameraPosition.builder().target(home).zoom(16).bearing(0).tilt(45).build();

    // Set the camera to the position above
    googleMap.moveCamera(CameraUpdateFactory.newCameraPosition(Liberty));
  }
}
