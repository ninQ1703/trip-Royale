from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Search
from .forms import SearchForm
import folium
import geocoder,requests,json

def index(request):
    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = SearchForm()
    address = Search.objects.all().last()
    location = geocoder.osm(address)
    lat = location.lat
    lng = location.lng
    country = location.country
    if lat == None or lng == None:
        address.delete()
        return HttpResponse("Oops!! Location not found :/")
    
    
    headers = {
	    "X-RapidAPI-Key": "669f60476bmsh8517cd0a04291bdp146acfjsnfe3e866849b4",
	    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com"
    }  
    
    url = "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete"
    
    querystring={"query":address}
    
    response=requests.request("GET",url,headers=headers,params=querystring)
    data=response.json()
    
    # f=open('data.json','wb')
    # f.write(json.dumps(data).encode())
    
    geoID=data["data"]["Typeahead_autocomplete"]["results"][3]["documentId"]
    
    print("geoID is ",geoID)
    # time.sleep(2)
    
    url = "https://travel-advisor.p.rapidapi.com/hotels/v2/list"

    querystring = {
        "latitude":lat,
        "longitude":lng,
        "limit":int(10),
    }

    payload = {
        "geoId": int(geoID),
    }
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": "669f60476bmsh8517cd0a04291bdp146acfjsnfe3e866849b4",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com"
    }

    response = requests.request("POST", url, json=payload, headers=headers, params=querystring)

        
    data=response.json()
    
    f=open('data.json','wb')
    f.write(json.dumps(data).encode())
    
    

    
    m = folium.Map(location=[lat, lng], zoom_start=10, zoom_control=True, max_zoom=18)
    
    
    data1=data["data"]["AppPresentation_queryAppListV2"][0]["mapSections"]
    # folium.Marker([lat, lng], tooltip='Click for more',popup=country).add_to(m)
    
    size=len(data1[0]["pins"])
    
    hotel_list=[]
    for i in range(size):
        my_dict={
            "name":"Place".format(i),
            "latitude":0,
            "longitude":0,
        }
        hotel_list.append(my_dict)
        
    for i in range(size):
        data2=data1[0]["pins"][i]["geoPoint"]
        hotel_list[i]["latitude"]=data2["latitude"]
        hotel_list[i]["longitude"]=data2["longitude"]
    
    for i in range(size):
        hotel_list[i]["name"]=data1[1]["content"][i]["cardTitle"]["string"]
        
    for hotel in hotel_list:
        folium.Marker([hotel["latitude"],hotel["longitude"]],tooltip='Click for more',popup=hotel["name"]).add_to(m)
        
    m = m._repr_html_()
    context = {
        'm': m,
        'form': form,
    }
    return render(request, 'index.html', context)