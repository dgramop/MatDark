#!/usr/bin/env ruby
result = `sass matdark.scss matdark.css`
raise result unless $?.to_i == 0
raise "When compiled this should spit some supa-hot CSS" unless File.exists?('matdark.css')
puts "Regular compile worked successfully"
