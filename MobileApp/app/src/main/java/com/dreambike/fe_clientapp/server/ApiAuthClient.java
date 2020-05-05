package com.example.fe_clientapp.server;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApiAuthClient {
  private String baseUrl;
  private String username;
  private String password;
  private String urlResource;
  private String httpMethod; // GET, POST, PUT, DELETE
  private String urlPath;
  private String lastResponse;
  private String payload;
  private HashMap<String, String> parameters;
  private Map <String, List<String>> headerFields;

  /**
   *
   * @param baseUrl String
   * @param username String
   * @param password String
   */
  public ApiAuthClient(String baseUrl, String username, String password){
    setBaseUrl(baseUrl);
    this.username = username;
    this.password = password;
    this.urlResource = "";
    this.urlPath = "";
    this.httpMethod = "GET";
    parameters = new HashMap<>();
    lastResponse = "";
    payload = "";
    headerFields = new HashMap<>();
    System.setProperty("jsse.enableSNIExtension", "false");
  }

  /**
   *
   * --&gt;http://BASE_URL.COM&lt;--/resource/path
   * @param baseUrl the root part of the URL
   * @return this
   */

  public ApiAuthClient setBaseUrl(String baseUrl) {
    this.baseUrl = baseUrl;
    if (!baseUrl.substring(baseUrl.length() -1).equals("/")){
      this.baseUrl += "/";
    }
    return this;
  }

  /**
   * Set the name of the resource that is used for calling the Rest API.
   * @param urlResource http://base_url.com--&gt;URL_RESOURCE&lt;--/url_path
   * @return
   */
  public ApiAuthClient setUrlResource(String urlResource){
    this.urlResource = urlResource;
    return this;
  }

}
