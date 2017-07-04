class Api::WikisController < ApplicationController
  def show
    res = JSON.parse(RestClient.get('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&list=&meta=&continue=&titles=Gizmodo%7CGeekWire%7CThe_Verge%7CTechCrunch%7CPopular_Science%7CPC_Magazine&rvprop=content&rvsection=0'))
    pages = res["query"]["pages"]
    infoboxes = pages.keys.map { |page| pages[page]["revisions"][0]["*"] }
    @wikis = Hash.new(0)
    infoboxes.each_with_index do |wiki, i|
      content = Hash.new(0)
      content["title"] = get_data("name", wiki)
      content["type"] = parse_type(get_data("type", wiki))
      content["editor"] = get_data("editor", wiki)
      content["publisher"] = get_data("publisher", wiki)
      content["owner"] = parse_answer(get_data("owner", wiki))
      content["url"] = get_url(wiki)
      content["year"] = get_year(wiki)
      content["creator"] = parse_answer(get_data("author", wiki))
      @wikis[i] = content
    end
    render :show
  end

  def get_data(type, str)
    arr = str.split(" ")
    if type == "name" && !arr.include?("name")
      type = !arr.include?("title") ? "|title" : "title"
    elsif type == "type" && !arr.include?("type")
      type = !arr.include?("category") ? "|category" : "category"
    elsif type == "editor" && !arr.include?("editor")
      type = "|editor"
    end
    type_index = arr.index(type)
    answer = ""
    if !type_index.nil?
      answer = arr[type_index + 1] + " "
      start_ind = type_index + 2
      until arr[start_ind] == "|" || arr[start_ind].include?("|")
        answer += arr[start_ind] + " "
        start_ind += 1
      end
    else
      answer = double_check(type, str)
    end
    syms = { "[" => true, "]" => true, "'" => true, "=" => true}
    answer = answer.split("").reject { |letter| syms.include?(letter) }.join("")
    answer = answer.slice(0, answer.length - 1) if answer[answer.length - 1] == ","
    answer == "" ? "N/A" : answer
  end

  def get_url(str)
    answer = ""
    arr = str.split(" ")
    type = !arr.include?("url") ? "website" : "url"
    type_index = arr.index(type)
    if !type_index.nil?
      if arr[type_index + 1].include?("=[")
        return arr[type_index + 1].slice(2, arr[type_index + 1].length - 2)
      end
      start_ind = type_index + 2
      url_str = arr[start_ind]
      url = url_str.slice(6, url_str.length)
      if url.nil?
        answer = double_check("URL", str)
      else
        url.each_char do |letter|
          break if letter == "}" || letter == "|"
          answer += letter
        end
      end
    end
    answer == "" ? "N/A" : answer
  end

  def get_year(str)
    answer = ""
    type_ind = str.index("start date")
    if !type_ind.nil?
      until str[type_ind].to_i > 0
        type_ind += 1
      end
      answer = str.slice(type_ind, 4)
    end
    answer == "" ? "N/A" : answer
  end

  def parse_answer(str)
    return "N/A" if str == "N/A"
    syms = { "<" => true, ">" => true }
    answer = ""
    toggle = true
    str.each_char do |char|
      answer += char if toggle
      if syms.include?(char)
        toggle = !toggle
      end
    end
    answer = answer.slice(0, answer.length - 1)
    answer.split("<").join(", ")
  end

  def parse_type(str)
    str.include?("|") ? str.split("|").join(", ") : str
  end

  def double_check(type, str)
    if type == "|category"
      idx = str.index(type)
      answer = ""
      until str[idx] == "["
        idx += 1
      end
      until str[idx] == "]"
        answer += str[idx]
        idx += 1
      end
      return answer + str[idx] + str[idx + 1]
    elsif type == "URL"
      idx = str.index(type)
      url = ""
      until str[idx] == "w"
        idx += 1
      end
      until str[idx] == "|"
        url += str[idx]
        idx += 1
      end
      return url
    else
      return ""
    end
  end

end
