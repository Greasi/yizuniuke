<?php
namespace frontend\controllers;

/**
 *      ┏┓　　　┏┓
 *    ┏┛┻━━━┛┻┓
 *    ┃　　　　　　　┃
 *    ┃　　　━　　　┃
 *    ┃　┳┛　┗┳　┃
 *    ┃　　　　　　　┃
 *    ┃　　　┻　　　┃
 *    ┃　　　　　　　┃
 *    ┗━┓　　　┏━┛
 *        ┃　　　┃   神兽保佑
 *        ┃　　　┃   代码无BUG！
 *        ┃　　　┗━━━┓
 *        ┃　　　　　　　┣┓
 *        ┃　　　　　　　┏┛
 *        ┗┓┓┏━┳┓┏┛
 *          ┃┫┫　┃┫┫
 *          ┗┻┛　┗┻┛
 */

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\mongodb\Query;
use app\models\Intelligenttest;
use yii\data\Pagination;
use frontend\controllers\MessageController;
use app\models\Ti;
use yii\widgets\LinkPager;

/**
 * Question controller
 */
class QuestionController extends MessageController
{
	

	/*public function beforeAction($action){

		if(!isset($_SESSION['user_info'])){

			echo $this->error("请登录","index.php?r=public/login",'1');
		}else{
		
			return true;
		}
	}*/
        
        
        //智能专项练习
        public function actionIntelligenttest(){
            $query = Intelligenttest::find();
            //var_dump($query);die;
            $pagination = new Pagination([
                            'defaultPageSize' => 5,
                            'totalCount' => $query->count(),
            ]);

            $row = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->all();

           // print_r($row);
            return $this->renderPartial('intelligenttest_index', [
                            'data'   => $row,
                            'pagination' => $pagination,
            ]);
        }
        //智能专项练习添加
	public function actionIntelligenttest_add(){
            return $this->renderPartial('intelligenttest_add');
	}
        
        public function actionIntelligenttest_doadd()
        {
            $intelligenttest = new Intelligenttest;
            $intelligenttest->title=$_POST['title'];
            $intelligenttest->pid = 0;
            $intelligenttest->leave = 0;
            if($intelligenttest->save()){
                echo $this->success("添加成功","index.php?r=question/intelligenttest",'1');
            }else{
                echo $this->error("添加失败","index.php?r=question/intelligenttest",'1');
            }
        }
        
        //2级题目
        public function actionIntelligenttest2_add()
        {
            $arr = Intelligenttest::find()->where(['leave'=>0])->all();
            return $this->renderPartial('intelligenttest2_add',['data'=> $arr]);
        }
        public function actionIntelligenttest2_doadd()
        {
            $intelligenttest = new Intelligenttest;
            $intelligenttest -> title=$_POST['title'];
            $intelligenttest -> pid = $_POST['pid'];
            $intelligenttest -> leave = 1;
            if($intelligenttest->save()){
                echo $this->success("添加成功","index.php?r=question/intelligenttest",'1');
            }else{
                echo $this->error("添加失败","index.php?r=question/intelligenttest",'1');
            }
        }
        
        //添加题
        public function actionAdd_ti()
        {
            $arr = Intelligenttest::find()->where(['leave'=>1])->all();
            return $this->renderPartial('add_ti',['data'=> $arr]);
        }
        public function actionDoadd_ti()
        {
            foreach ($_POST['question'] as $k=>$v){
                $ti = new Ti;
                $ti -> pid = $_POST['pid'][$k];
                $ti -> question  = $v;
                $ti -> type  = $_POST['type'][$k];
                $ti -> really_answer  = $_POST["really_answer"][$k];
                $ti -> all_answer = implode(';',$_POST["all_answer_$k"]);
                $arr=  $ti->save();
            }
            if($arr){
                echo $this->success("添加成功","index.php?r=question/intelligenttest",'1');
            }else{
                echo $this->error("添加失败","index.php?r=question/intelligenttest",'1');
            }
        }
        
        //题列表
        public function actionTi_list()
        {
            $arr = Intelligenttest::find()->where(['leave'=>1])->all();
            $query = Ti::find();
            //var_dump($query);die;
            $pagination = new Pagination([
                'defaultPageSize' => 5,
                'totalCount' => $query->count(),
            ]);
            $row = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->asArray()
            ->all();
            //print_r($row);die;
            return $this->renderPartial('ti_list', [
                    'data'   => $row,
                    'pagination' => $pagination,
                    'arr'    => $arr
            ]);
        }
        
        //题搜索
        public function actionTi_sousuo()
        {
            $id=$_GET['id'];
            //echo $pid;
            $arr = Intelligenttest::find()->where(['leave'=>1])->all();
            $query = Ti::find()->where(['pid'=>$id]);
            //var_dump($query);die;
            $pagination = new Pagination([
                'defaultPageSize' => 5,
                'totalCount' => $query->count(),
            ]);
            $row = $query
            ->where(['pid'=>$id])
            ->asArray()
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->all();
            $str = '<table class="table table-striped table-bordered table-hover" id="sample_1">
							<thead>
							<tr>
								<th class="table-checkbox">
									<input type="checkbox" class="group-checkable" data-set="#sample_1 .checkboxes"/>
								</th>
								<th>
									 ID
								</th>
								<th>
									 题目名称
								</th>
                                                                <th>
									 题目类型
								</th>
                                                                <th>
									 题目选项
								</th>
                                                                <th>
									 正确答案
								</th>
								<th>
									 父分类
								</th>
								<th>
									 操作
								</th>
							</tr>
							</thead>
							 <tbody>';
            foreach($row as $v){
            $str.='<tr class="odd gradeX">
								<td>
									<input type="checkbox" class="checkboxes" value="1"/>
								</td>
								<td>
									 '.$v['_id'].'
								</td>
								<td width="410">
									<a href="mailto:shuxer@gmail.com">
										 '.$v['question'].'
									</a>
								</td>
                                                                <td>
									 '.$v['type'].'
								</td>
                                                                <td width="200">
									 '.$v['all_answer'].'
								</td>
                                                                <td>
									 '.$v['really_answer'].'
								</td>
                                                                <td>
                                                                    ';
                                                                    foreach($arr as $vv){
                                                                        if($v['pid']==$vv['_id']){ 
                                                                            $str.= $vv['title'];
                                                                        }
                                                                    }
                                                                   $str.= '
								</td>
								<td>
									<span>
                                                                            <a href="#" class="label label-sm label-success">删除</a> 
									</span>
									<span class="label label-sm label-success">
										 修改
									</span>
								</td>
							</tr>';
            }
            $str.="</tbody>
							</table>";
           $page = LinkPager::widget(['pagination' => $pagination]);
           
           if(@$_GET['page']){
               
               return $this->renderPartial('ti_list', [
                    'data'   => $row,
                    'pagination' => $pagination,
                    'arr'    => $arr
            ]);
               
           }else{
           
            echo json_encode([
                    'page' => $page,
                    'content'    => $str
                ]);
           }
        }
}