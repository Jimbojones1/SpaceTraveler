require 'bundler'
Bundler.require()

get '/' do
  erb :index
end

get '/home' do
  redirect ('/')
end

get '/about' do
  erb :about
end

get '/images' do
  erb :images
end

get '/contact' do
  erb :contact
end

get '/pricing' do
  erb :pricing
end

#test comment
