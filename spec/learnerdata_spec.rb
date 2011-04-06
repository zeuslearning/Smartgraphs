# ==========================================================================
# Project:   Smartgraphs Lebowski test specification
# Copyright: ©2010 Concord Consortium
# @author    Parker Morse <pmorse@cantinaconsulting.com>
# @author    Based on an original by Noah Paessel for MySystem
# ==========================================================================

# This helper provides several convenience methods and loads proxies for objects to be tested.
require "#{File.dirname(__FILE__)}/support/smartgraphs_spec_helper.rb"
require 'rubygems'
require 'lebowski'
require 'couchrest'


TEST_PORT =  ENV[:TEST_PORT.to_s] || 4022;
SELENIUM_PORT = ENV[:SELENIUM_PORT.to_s] || 4244;
TEST_SETTINGS = {
  :app_root_path => "/smartgraphs#/shared/example?learner=1&database=smartgraphs-lebowski",
  :app_name => "Smartgraphs",
  :app_server_port => TEST_PORT,
  :selenium_server_port => SELENIUM_PORT,
  :browser => :firefox
}

# Delete the CouchDB database before we start our test run.
`curl -vX DELETE http://127.0.0.1:5984/smartgraphs-lebowski`

describe "/shared/example?learner=1" do
  before(:all) do
    start_testing_servers
    @test = new_test(TEST_SETTINGS)
    # defined with app.define_path in the helper
    @response_template = @test['response_template']
    @submit_button = @test['submit_button']

    # for interaction with couchdb
    @db = CouchRest.database("http://127.0.0.1:5984/smartgraphs-lebowski")
  end

  after(:all) do
    stop_testing_servers
  end

  it "should have a response template" do
    @response_template.should_not be nil
  end
  
  it "should have a submit button" do
    @submit_button.should_not be nil
  end
  
  it "should have an empty values array in the response template" do
    @response_template.values.should == []
  end
  
  it "should not have anything stored in CouchDB for /shared/example/learner/1" do
    @db.view('by_url/url')['rows'].count.should be 0 
  end
  
  it "it should have a radio view template" do
    @response_template['childViews.0'].should be_a_kind_of RadioView
    @response_template['childViews.0'].buttons.should have_count 4
    # @response_template['childViews.0'].buttons.should_not have_any_selected
  end
  
  it "after choosing item 1, it should have values [2]" do
    @response_template['childViews.0'].buttons.click 1
    @response_template.values.should == [2] # buttons are 1-based, but clicks are 0-based
    # @response_template['childViews.0'].buttons.should have_one_selected
  end
  
  it "should saved to the database after clicking Next" do
    @submit_button.click
    @db.view('by_url/url')['rows'].count.should be 1
  end
  
  it "should have an empty textfield view template" do
    @response_template['childViews.0.childViews.0'].should be_a_kind_of TextFieldView
    # @response_template['childViews.0.childViews.0'].should have_value that_is_empty
  end
  
  it "after entering text \"foobar\", it should have values[\"foobar\"]" do
    @response_template['childViews.0.childViews.0'].type "foobar"
    @response_template['childViews.0.childViews.0'].should have_value "foobar"
    @response_template.values.should == ["foobar"]
  end
  
  it "it should save to the database again after clicking Next" do
    @submit_button.click
    @db.view('by_url/url')['rows'].count.should be 1
  end
  
end

TEST_SETTINGS2 = {
  :app_root_path => "/smartgraphs#/shared/example?learner=2&database=smartgraphs-lebowski",
  :app_name => "Smartgraphs",
  :app_server_port => TEST_PORT,
  :selenium_server_port => SELENIUM_PORT,
  :browser => :firefox
}

describe "/shared/example?learner=2" do
  before(:all) do
    start_testing_servers
    @test = new_test(TEST_SETTINGS2)
    # defined with app.define_path in the helper
    @response_template = @test['response_template']
    @submit_button = @test['submit_button']

    # for interaction with couchdb
    @db = CouchRest.database("http://127.0.0.1:5984/smartgraphs-lebowski")
  end

  after(:all) do
    stop_testing_servers
  end

  it "should have a response template" do
    @response_template.should_not be nil
  end
  
  it "should have a submit button" do
    @submit_button.should_not be nil
  end
  
  it "should have an empty values array in the response template" do
    @response_template.values.should == []
  end
  
  it "should not have anything stored in CouchDB for /shared/example/learner/2" do
    @db.view('by_url/url')['rows'].count.should be 1 # this is the /learner/1 document
  end
  
  it "it should have a radio view template" do
    @response_template['childViews.0'].should be_a_kind_of RadioView
    @response_template['childViews.0'].buttons.should have_count 4
    # @response_template['childViews.0'].buttons.should_not have_any_selected
  end
  
  it "after choosing item 1, it should have values [2]" do
    @response_template['childViews.0'].buttons.click 1
    @response_template.values.should == [2] # buttons are 1-based, but clicks are 0-based
    # @response_template['childViews.0'].buttons.should have_one_selected
  end
  
  it "should saved to the database after clicking Next" do
    @submit_button.click
    @db.view('by_url/url')['rows'].count.should be 2
  end
  
  it "should have an empty textfield view template" do
    @response_template['childViews.0.childViews.0'].should be_a_kind_of TextFieldView
    # @response_template['childViews.0.childViews.0'].should have_value that_is_empty
  end
  
  it "after entering text \"foobar\", it should have values[\"foobar\"]" do
    @response_template['childViews.0.childViews.0'].type "foobar"
    @response_template['childViews.0.childViews.0'].should have_value "foobar"
    @response_template.values.should == ["foobar"]
  end
  
  it "it should save to the database again after clicking Next" do
    @submit_button.click
    @db.view('by_url/url')['rows'].count.should be 2
  end
  
end

TEST_SETTINGS3 = {
  :app_root_path => "/smartgraphs#/shared/example?learner=1&database=smartgraphs-lebowski",
  :app_name => "Smartgraphs",
  :app_server_port => TEST_PORT,
  :selenium_server_port => SELENIUM_PORT,
  :browser => :firefox
}

describe "/shared/instantaneous-speed?learner=1" do
  before(:all) do
    start_testing_servers
    @test = new_test(TEST_SETTINGS3)
    # defined with app.define_path in the helper
    @response_template = @test['response_template']
    @submit_button = @test['submit_button']

    # for interaction with couchdb
    @db = CouchRest.database("http://127.0.0.1:5984/smartgraphs-lebowski")
  end

  after(:all) do
    stop_testing_servers
  end

  it "should have a response template" do
    @response_template.should_not be nil
  end
  
  it "should have a submit button" do
    @submit_button.should_not be nil
  end
  
  it "should have a values array in the response template == [2]" do
    @response_template.values.should == [2]
  end
  
  it "should have two document stored in CouchDB" do
    @db.view('by_url/url')['rows'].count.should be 2
  end
  
  it "it should have a radio view template" do
    @response_template['childViews.0'].should be_a_kind_of RadioView
    @response_template['childViews.0'].buttons.should have_count 4
    # @response_template['childViews.0'].buttons.should_not have_any_selected
  end
  
  it "after choosing item 2, it should have values [3]" do
    @response_template['childViews.0'].buttons.click 2
    @response_template.values.should == [3] # buttons are 1-based, but clicks are 0-based
    # @response_template['childViews.0'].buttons.should have_one_selected
  end
  
  it "should saved to the database after clicking Next" do
    @submit_button.click
    @db.view('by_url/url')['rows'].count.should be 2
  end
  
  it "should have a values array in the response template with [\"foobar\"]" do
    @response_template.values.should == ["foobar"]
    @response_template['childViews.0.childViews.0'].should be_a_kind_of TextFieldView
    @response_template['childViews.0.childViews.0'].should have_value "foobar"
  end
  
  it "it should save to the database again after clicking Next" do
    @submit_button.click
    @db.view('by_url/url')['rows'].count.should be 2
  end
  
end
