package com.dreambike.fe_clientapp.ui.home;

import android.app.Activity;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.dreambike.fe_clientapp.R;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

public class HomeFragment extends Fragment implements OnMapReadyCallback{

  private GoogleMap mGoogleMap;
  private MapView mMapView;
  private View mView;

  public HomeFragment (){
    // Required empty public constructor
  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
  }

  @Override
  public View onCreateView(@NonNull LayoutInflater inflater,
                           ViewGroup container, Bundle savedInstanceState) {
    // Inflate the layout for this fragment
    Log.e("log: ", "OnCreateView - home.");
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

    // Set a position
    CameraPosition Liberty = CameraPosition.builder().target(home).zoom(16).bearing(0).tilt(45).build();

    // Set the camera to the position above
    googleMap.moveCamera(CameraUpdateFactory.newCameraPosition(Liberty));
  }
}
