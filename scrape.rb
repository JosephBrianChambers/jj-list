#t.inte ger  "user_id"
# t.integer  "price"
# t.string   "title"
# t.text     "body"
# t.string   "location"
# 
# :image


require 'httparty'

urls_file = "urls_file.txt"
scrape = "text_scrape.txt"
#results_file = "results.txt"
user_ids = (5..30).to_a
no_pic_gen = (1..10).to_a
locations = [
"Alamo Square",
"Anza Vista",
"Ashbury Heights",
"Balboa Park",
"Balboa Terrace",
"Bayview",
"Belden Place",
"Bernal Heights",
"Buena Vista",
"Butchertown",
"Castro",
"Cathedral Hill",
"Cayuga Terrace",
"China Basin",
"Chinatown",
"Civic Center",
"Clarendon Heights",
"Cole Valley",
"Corona Heights",
"Cow Hollow",
"Crocker-Amazon",
"Design District",
"Diamond Heights",
"Dogpatch",
"Dolores Heights",
"Duboce Triangle",
"Embarcadero",
"Eureka Valley",
"Excelsior",
"Fillmore",
"Financial District",
"Financial District South",
"Fisherman's Wharf",
"Forest Hill",
"Forest Knolls",
"Glen Park",
"Golden Gate Heights",
"Haight-Ashbury",
"Hayes Valley",
"Hunters Point",
"India Basin",
"Ingleside",
"Ingleside Terraces",
"Inner Sunset",
"Islais Creek",
"Jackson Square",
"Japantown",
"Jordan Park",
"Laguna Honda",
"Lake Street",
"Lakeside",
"Lakeshore",
"Laurel Heights",
"Little Hollywood",
"Little Russia",
"Little Saigon",
"Lone Mountain",
"Lower Haight",
"Lower Pacific Heights",
"Lower Nob Hill",
"Marina District",
"Merced Heights",
"Merced Manor",
"Midtown Terrace",
"Mid-Market",
"Miraloma Park",
"Mission Bay",
"Mission District",
"Mission Dolores",
"Mission Terrace",
"Monterey Heights",
"Mount Davidson",
"Nob Hill",
"Noe Valley",
"North Beach",
"North of Panhandle",
"Oceanview",
"Outer Mission",
"Outer Sunset",
"Pacific Heights",
"Parkmerced",
"Parkside",
"Parnassus",
"Polk Gulch",
"Portola",
"Portola Place",
"Potrero Hill",
"Presidio",
"Presidio Heights",
"Richmond District",
"Rincon Hill",
"Russian Hill",
"Saint Francis Wood",
"Sea Cliff",
"Sherwood Forest",
"Silver Terrace",
"Somisspo",
"South Beach",
"South of Market",
"South Park",
"Sunnydale",
"Sunnyside",
"Sunset District",
"Telegraph Hill",
"Tenderloin",
"Treasure Island",
"Twin Peaks",
"Union Square",
"University Mound",
"Upper Market",
"Visitacion Valley",
"Vista del Mar",
"West Portal",
"Western Addition",
"Westwood Highlands",
"Westwood Park",
"Yerba Buena"]


#open urls file and append ever http string to text scrape



#open scrape file for appending
File.open(scrape, 'a') do |f| 
  
  #append http string for every line in urls file
  File.foreach(urls_file) do |line|
    f.write("\n#{HTTParty.get(line)}")
  end
end

scrape_str = File.read(scrape)
#arr of arays, imageUrl, title, price, description
scrape_data = scrape_str.scan(/src="([\S]+jpeg?)"\/[\S+\s*]+?class="t">([\S+\s*]+?)<\/a>[\S+\s*]+?\$(\S+)[\s+\S*]+?vblock"><p>([\s*\S*]+?)<\/p>/m)

ActiveRecord::Base.transaction do
  scrape_data.each do |post_data|
    newpost = Post.new(:user_id => user_ids.sample, :price => post_data[2], :title => post_data[1], :body => post_data[3], :location => locations.sample)
    if no_pic_gen.sample < 7
      newpost.photos.build(:image => post_data[0])
    end
    newpost.save!
  end
end#transaction 


