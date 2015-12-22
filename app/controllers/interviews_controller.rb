class InterviewsController < ApplicationController
	before_action :authenticate_user!
  #before_action :check_interviewer
  def index
    @interviews = Interview.paginate(page: params[:page], :per_page => 5)
  end
	def new
    @interview = Interview.new
  end

  def show
    @interview = Interview.find(params[:id])
  end

  def create
    @interview = Interview.new(interview_params)
      respond_to do |format|
        if @interview.save
          format.html do
            redirect_to passage_interview_path(@interview), notice: 'Interview was successfully created'
          end
          format.json { render :show, status: :created, location: @interview }
        else
          format.html { render :new }
          format.json do
            render json: @interview.errors, status: :unprocessable_entity
          end
        end
      end
  end

  def destroy
    Interview.find(params[:id]).destroy
    flash[:success] = 'Interview deleted'
    redirect_to interviews_path
  end

  def passage
    @interview = Interview.find(params[:id])
    @id_questions = []
    @questions = @interview.template.questions
    @all_questions = Question.all
    @all_questions.each do |aq|
      @questions.each do |q|
        @id_questions.push(aq.id)
        InterviewQuestion.create(question_id: aq.id, interview_id: @interview.id) if aq.content == q.content
      end 
    end

    

  end

  private

  def interview_params
    params.require(:interview).permit(:firstname, :lastname, :target_level, :template_id, :user_id)
  end

  def check_interviewer
    return true unless current_user.admin?
    redirect_to authenticated_root_path, notice: 'Access Denied'
  end

end
