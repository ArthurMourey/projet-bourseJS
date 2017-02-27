require 'sinatra/base'
require 'json'

class Server < Sinatra::Base
  
  cart = { cart: [] };
  
  before do
     content_type :json    
     headers 'Access-Control-Allow-Origin'  => '*', 
             'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
             'Access-Control-Allow-Headers' => ['Content-Type']
             
  end
  
  get '/products' do    
    {
      products: [
        {
        name: 'atmega328',
        description: 'atmel microcontroller as used in arduino',
        price: '2€'
        },
        {
          name: 'attiny85',
          description: 'one of the smallest atmel microcontroller',
          price: '1€'
        },
        {
          name: 'esp8266',
          description: 'microcontroller for wifi with a tcp/ip stack',
          price: '3€'
        },
        {
          name: 'cortex-m4',
          description: '32 bits ARM processor',
          price: '4€'
        }
      ]
    }.to_json
  end
  
  options '/cart' do
    200
  end

  get '/cart' do
    cart.to_json
  end
  
  post '/cart' do
    cart[:cart] << JSON.parse(request.body.read)
    cart.to_json
  end
  
  get '/validation' do
    time = sleep(rand(1..4))
    {status: 'ok', time: time}.to_json
  end

end
